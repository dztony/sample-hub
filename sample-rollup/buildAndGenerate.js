import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import { parse } from 'acorn';
import * as walk from 'acorn-walk';
import * as escodegen from 'escodegen';

const curDir = getCurDirName();

// 所有模块的信息
const moduleInfo = [];
const importList = [];
const exportInfo = {};

function getCurDirName() {
  return path.dirname(fileURLToPath(import.meta.url));
}

function prepare(output) {
  if (!fs.existsSync(path.dirname(output))) {
    fs.mkdirSync(path.dirname(output));
  }

  if (!fs.existsSync(output)) {
    fs.writeFileSync(output, '');
  }
}

function readCodeByPath(path) {
  return fs.readFileSync(path, 'utf-8');
}

function getAstFromFile(filePath) {
  const code = readCodeByPath(filePath);
  return parse(code, {
    ecmaVersion: 6,
    sourceType: 'module',
    locations: false,
  });
}

function log(obj) {
  console.log(JSON.stringify(obj, null, 2));
}

function packInfo(filePath) {
  const ast = getAstFromFile(filePath);
  walk.simple(ast, {
    ImportDeclaration(node) {
      const curImportVarName = node.specifiers[0].imported.name;
      importList.push(curImportVarName);
      const importResolvePath = path.join(curDir, 'demo', node.source.value);
      const curImportResolveInfo = packInfo(importResolvePath);
      moduleInfo.push(curImportResolveInfo);
    },
    ExportNamedDeclaration(node) {
      // log(node);
      walk.simple(node, {
        VariableDeclaration(varNode) {
          // console.log('varNode - ', JSON.stringify(varNode, null, 2));
          const exportVars = varNode.declarations.map(item => item.id.name);
          // console.log('导出的 变量 - ', exportVars);
          varNode.declarations.forEach(item => {
            const curVarName = item.id.name;
            exportInfo[curVarName] = {
              ...exportInfo[curVarName],
              astNode: varNode,
            }
          });
        },
        FunctionDeclaration(funcNode) {
          // console.log('functionNode - ', JSON.stringify(funcNode, null, 2));
          const exportFunc = funcNode.id.name;
          // console.log('导出的函数名 - ', exportFunc);
          exportInfo[exportFunc] = {
            ...exportInfo[exportFunc],
            astNode: funcNode,
          };
        },
      });
    },
  });
  return {
    ast,
    resolveId: filePath,
  };
}


function main() {
  const entry = path.join(curDir, '/demo/main.js');
  const output = path.join(curDir, 'distMy/bundleMy.js');
  prepare(output);

  const entryModuleInfo = packInfo(entry);
  moduleInfo.push(entryModuleInfo);

  entryModuleInfo.ast.body = entryModuleInfo.ast.body.filter(item => item.type !== 'ImportDeclaration');
  importList.forEach(item => {
    const importNode = exportInfo[item].astNode;
    entryModuleInfo.ast.body = [
      importNode,
      ...entryModuleInfo.ast.body,
    ];
  });
  log(entryModuleInfo.ast);
  const codeStr = escodegen.generate(entryModuleInfo.ast);
  fs.writeFileSync(output, codeStr, 'utf-8');
}

main();
