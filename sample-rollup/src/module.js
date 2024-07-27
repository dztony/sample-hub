import { parse } from 'acorn';
import { simple } from "acorn-walk";

import analyseAST from "./ast/analyseAST.js";
import MagicString from 'magic-string';
import { has, keys } from "./utils/object.js";
import { sequence } from "./utils/promise.js";

const emptyArrayPromise = Promise.resolve([])

export default class Module {
  constructor({code, path, bundle}) {
    this.code = new MagicString(code, {
      filename: path,
    })

    this.path = path;
    this.bundle = bundle;
    this.suggestedNames = {};
    this.ast = parse(code, {
      ecmaVersion: 6,
      sourceType: 'module',
    });

    this.analyse();
  }

  // 分析导入和导出的模块，将引入的模块和导出的模块填入对应的数组
  analyse() {
    this.imports = getImportInfoFromAst(this.ast);
    this.exports = getExportInfoFromAst(this.ast);

    // 调用 ast 目录下的 analyse()
    // 从 AST 中分析出详细的信息
    analyseAST(this.ast, this.code, this);
    // 当前模块下的顶级变量（包括函数声明）
    this.definedNames = this.ast._scope.names.slice()
    this.canonicalNames = {}
    this.definitions = {}
    this.definitionPromises = {}
    this.modifications = {}

    this.ast.body.forEach(statement => {
      // 读取当前语句下的变量
      Object.keys(statement._defines).forEach(name => {
        this.definitions[name] = statement
      })

      // 再根据 _modifies 修改它们，_modifies 是在 analyse() 中改变的
      Object.keys(statement._modifies).forEach(name => {
        if (!has(this.modifications, name)) {
          this.modifications[name] = []
        }

        this.modifications[name].push(statement)
      })
    })
  }

  expandAllStatements(isEntryModule) {
    let allStatements = []

    return sequence(this.ast.body, statement => {
      // skip already-included statements
      if (statement._included) return

      // 不需要对导入语句作处理
      if (statement.type === 'ImportDeclaration') {
        return
      }

      // skip `export { foo, bar, baz }`
      if (statement.type === 'ExportNamedDeclaration' && statement.specifiers.length) {
        // but ensure they are defined, if this is the entry module
        // export { foo, bar, baz }
        // 遇到这样的语句，如果是从其他模块引入的函数，则会去对应的模块加载函数，
        if (isEntryModule) {
          return this.expandStatement(statement)
            .then(statements => {
              allStatements.push.apply(allStatements, statements)
            })
        }

        return
      }

      // 剩下的其他类型语句则要添加到 allStatements 中，以待在 bundle.generate() 中生成
      // include everything else
      return this.expandStatement(statement)
        .then(statements => {
          allStatements.push.apply(allStatements, statements)
        })
    }).then(() => {
      return allStatements
    })
  }

  expandStatement(statement) {
    if (statement._included) return emptyArrayPromise
    statement._included = true

    let result = []

    // 根据 AST 节点的依赖项找到相应的模块
    // 例如依赖 path 模块，就需要去找到它
    const dependencies = Object.keys(statement._dependsOn)

    return sequence(dependencies, name => {
      // define() 将从其他模块中引入的函数加载进来
      return this.define(name).then(definition => {
        result.push.apply(result, definition)
      })
    })

      // then include the statement itself
      .then(() => {
        result.push(statement)
      })
      .then(() => {
        // then include any statements that could modify the
        // thing(s) this statement defines
        return sequence(keys(statement._defines), name => {
          const modifications = has(this.modifications, name) && this.modifications[name]

          if (modifications) {
            return sequence(modifications, statement => {
              if (!statement._included) {
                return this.expandStatement(statement)
                  .then(statements => {
                    result.push.apply(result, statements)
                  })
              }
            })
          }
        })
      })
      .then(() => {
        // the `result` is an array of statements needed to define `name`
        return result
      })
  }

  define(name) {
    if (has(this.definitionPromises, name)) {
      return emptyArrayPromise
    }

    let promise

    // The definition for this name is in a different module
    if (has(this.imports, name)) {
      const importDeclaration = this.imports[name]

      promise = this.bundle.fetchModule(importDeclaration.source, this.path)
        .then(module => {
          importDeclaration.module = module

          // suggest names. TODO should this apply to non default/* imports?
          if (importDeclaration.name === 'default') {
            // TODO this seems ropey
            const localName = importDeclaration.localName
            const suggestion = has(this.suggestedNames, localName) ? this.suggestedNames[localName] : localName
            module.suggestName('default', suggestion)
          } else if (importDeclaration.name === '*') {
            const localName = importDeclaration.localName
            const suggestion = has(this.suggestedNames, localName) ? this.suggestedNames[localName] : localName
            module.suggestName('*', suggestion)
            module.suggestName('default', `${suggestion}__default`)
          }

          if (module.isExternal) {
            if (importDeclaration.name === 'default') {
              module.needsDefault = true
            } else {
              module.needsNamed = true
            }

            module.importedByBundle.push(importDeclaration)
            return emptyArrayPromise
          }

          if (importDeclaration.name === '*') {
            // we need to create an internal namespace
            if (!this.bundle.internalNamespaceModules.includes(module)) {
              this.bundle.internalNamespaceModules.push(module)
            }

            return module.expandAllStatements()
          }

          const exportDeclaration = module.exports[importDeclaration.name]

          if (!exportDeclaration) {
            throw new Error(`Module ${module.path} does not export ${importDeclaration.name} (imported by ${this.path})`)
          }

          return module.define(exportDeclaration.localName)
        })
    }
    // The definition is in this module
    else if (name === 'default' && this.exports.default.isDeclaration) {
      // We have something like `export default foo` - so we just start again,
      // searching for `foo` instead of default
      promise = this.define(this.exports.default.name)
    } else {
      let statement

      if (name === 'default') {
        // TODO can we use this.definitions[name], as below?
        statement = this.exports.default.node
      } else {
        statement = this.definitions[name]
      }

      if (statement && !statement._included) {
        promise = this.expandStatement(statement)
      }
    }

    this.definitionPromises[name] = promise || emptyArrayPromise
    return this.definitionPromises[name]
  }

  getCanonicalName(localName) {
    if (has(this.suggestedNames, localName)) {
      localName = this.suggestedNames[localName]
    }

    if (!has(this.canonicalNames, localName)) {
      let canonicalName

      if (has(this.imports, localName)) {
        const importDeclaration = this.imports[localName]
        const module = importDeclaration.module

        if (importDeclaration.name === '*') {
          canonicalName = module.suggestedNames['*']
        } else {
          let exporterLocalName

          if (module.isExternal) {
            exporterLocalName = importDeclaration.name
          } else {
            const exportDeclaration = module.exports[importDeclaration.name]
            exporterLocalName = exportDeclaration.localName
          }

          canonicalName = module.getCanonicalName(exporterLocalName)
        }
      } else {
        canonicalName = localName
      }

      this.canonicalNames[localName] = canonicalName
    }

    return this.canonicalNames[localName]
  }

  rename(name, replacement) {
    this.canonicalNames[name] = replacement
  }

  suggestName(exportName, suggestion) {
    if (!this.suggestedNames[exportName]) {
      this.suggestedNames[exportName] = suggestion
    }
  }
}

let source;

function getImportInfoFromAst(ast) {
  const importMapper = {};

  simple(ast, {
    ImportDeclaration(node) {
      const source = node.source.value;
      node.specifiers.forEach(spec => {
        // 解包导入 import { a } from './source.js'
        const isUnpackImport = spec.type === 'ImportSpecifier';
        // 默认导入 import a from './source.js'
        const isDefaultImport = spec.type === 'ImportDefaultSpecifier';
        // 重名导入 import * as a from './source.js'
        const isNamedImport = spec.type === 'ImportNamespaceSpecifier';

        const localName = spec.local.name;
        let name;
        if (isDefaultImport) {
          name = 'default';
        } else if (isNamedImport) {
          name = '*';
        } else {
          name = spec.imported.name;
        }

        importMapper[localName] = {
          source,
          name,
          localName,
        };
      });
    },

  });

  return importMapper;
}

function getExportInfoFromAst(ast) {
  const exportMapper = {};
  simple(ast, {
    ExportDefaultDeclaration(node) {
      exportMapper['default'] = {
        node,
        name: 'default',
        localName: 'default',
        isDeclaration: false,
      };
    },
    ExportNamedDeclaration(node) {
      // console.log('named export - ', JSON.stringify(node, null, 2));
      source = node.source && node.source.value;
      const specifiers = node.specifiers;
      if (specifiers.length) {
        specifiers.forEach(spec => {
          const localName = spec.local.name;
          const exportedName = spec.exported.name;

          exportMapper[exportedName] = {
            localName,
            exportedName,
          };

          // TODO
          // 这种格式需要引入相应的模块
          // export { a } from './a.js';
        });
      } else {
        const declaration = node.declaration;
        let name;
        if (declaration.type === 'VariableDeclaration') {
          name = declaration.declarations[0].id.name;
        } else {
          name = declaration.id.name;
        }

        exportMapper[name] = {
          node,
          localName: name,
          expression: declaration,
        };
      }
    },
  });

  return exportMapper;
}
