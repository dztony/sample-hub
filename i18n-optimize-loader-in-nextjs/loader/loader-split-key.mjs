import { parse } from '@babel/parser';
import _traverse from '@babel/traverse';
import _generate from '@babel/generator';
import {
  getRootNode,
  ParseOptions,
  parseVarName,
  rootNeedProcess,
  GlobalName,
  generateModuleDictDefineStr
} from './util.mjs';

const traverse = _traverse.default;
const generate = _generate.default;

let loaderOptions = null;

export default function loaderSplitKey(source) {
  // const currentResourcePath = this.resource;
  //
  // if (!currentResourcePath.endsWith('/util/lang.ts')) {
  //   return source;
  // }

  // if (currentResourcePath.includes('/pages')) {
  //   return source;
  // }

  // console.log('当前处理的文件 ', currentResourcePath, this.request);

  this.cacheable(false);

  if (!loaderOptions) {
    loaderOptions = this.getOptions();
  }

  const ast = parse(source, ParseOptions);

  traverse(ast, {
    CallExpression(path) {
      const { node, parent } = path;
      const oldTranslationHookPath = path;
      const keySet = new Set();
      if (node.callee.name === loaderOptions.translationFunctionName) {
        const varName = parseVarName(parent);
        const parentFunctionDeclaration = path.findParent(p => p.isFunctionDeclaration() || p.isArrowFunctionExpression());
        if (parentFunctionDeclaration.isArrowFunctionExpression()) {
          console.log('箭头函数待处理');
        }
        const rootPath = getRootNode(path);
        if (rootNeedProcess(rootPath)) {
          parentFunctionDeclaration.traverse({
            CallExpression(path) {
              const { node } = path;
              if (node.callee.name === varName) {
                const argumentNode = node.arguments[0];
                if (argumentNode.type === 'StringLiteral') {
                  keySet.add(argumentNode.value);
                } else {
                  console.error('未处理的 node 类型 - ', argumentNode.type);
                }
              }
            }
          });

          const translationDictDefine = generateModuleDictDefineStr(keySet, loaderOptions);
          const addDefineStr = `${loaderOptions.replaceHook.importStr}\n\n${translationDictDefine}`;
          const translationDictDefineAst = parse(addDefineStr, ParseOptions);
          parentFunctionDeclaration.insertBefore(translationDictDefineAst);
          oldTranslationHookPath.replaceWithSourceString(`${loaderOptions.replaceHook.name}(${GlobalName.translationDict})`);
        }
      }
    },
    VariableDeclarator(path) {
      if (path.node.id.name === loaderOptions.translationMapperName) {
        // console.log('path.parentPath - ', path.parentPath);
        const replaceDefineStr = `${loaderOptions.translationMapperName} = {}`;
        path.replaceWithSourceString(replaceDefineStr);
      }
    },
  });

  const newResource = generate(ast, ParseOptions).code;

  console.log(newResource);
  return newResource;
}
