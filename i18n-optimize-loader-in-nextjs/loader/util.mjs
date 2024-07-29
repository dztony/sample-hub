import fs from 'node:fs';
import path from 'node:path';

export function parseVarName(parent) {
  const node = parent.id.properties[0];
  return node.key.name;
}

export function getRootNode(path) {
  return path.findParent(p => p.isProgram());
}

export function rootNeedProcess(root) {
  let flag = true;
  root.traverse({
    VariableDeclaration(nodePath) {
      if (nodePath.node.declarations[0].id.name === GlobalName.translationDict) {
        flag = false;
      }
    }
  });

  return flag;
}

export function generateModuleDictDefineStr(keySet, loaderOptions) {
  const keyList = Array.from(keySet);
  const localePath = loaderOptions.localesPath;
  const files = fs.readdirSync(localePath).filter(f => {
    return f.endsWith('.json') &&
      loaderOptions.validLocaleNames.includes(f);
  });
  const dict = {};

  for (const file of files) {
    const fileStr = fs.readFileSync(path.join(localePath, file)).toString();
    const jsonObject = JSON.parse(fileStr);
    const curDict = {};
    for (const key of keyList) {
      curDict[key] = jsonObject[key] ?? key;
    }
    dict[file] = curDict;
  }

  const dictDefineStr = `const ${GlobalName.translationDict} = ${JSON.stringify(dict, null, 2)};`;
  return dictDefineStr;
}

export const GlobalName = {
  translationDict: 'g_module_translation_dict',
};

export const ParseOptions = {
  sourceType: 'module',
  plugins: ['jsx', 'typescript'],
};