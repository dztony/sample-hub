import { extname } from 'path';

export default function testHook() {
  return {
    name: 'test-hook',
    version: '1.0.0',
    generateBundle(outputOptions, bundle) {
      const files = getFileFromBundle(bundle);
      const attrs = outputOptions.format === 'es' ? { type: 'module' } : {};
      const scriptContent = getScriptsLink(files, attrs);
      const refId = this.emitFile({
        type: 'asset',
        fileName: 'index.html',
        source: `<!--generate by local plugin-->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
</head>
<body>
  <h1>generate title</h1>
  <div id="root"></div>
  ${scriptContent}
</body>
</html>
        `,
      });
    },
  };
}

function getFileFromBundle(bundle) {
  const result = {};
  for (const file of Object.values(bundle)) {
    if (file.isEntry) {
      const { fileName } = file;
      const extension = extname(fileName).substring(1);

      result[extension] = (result[extension] || []).concat({
        fileName: file.fileName,
        ...file,
      });
    }
  }


  return result;
}

function getScriptsLink(files, attrs) {
  const scriptAttrs = getScriptAttrs(attrs);
  const scriptItemList = files.js.map(item => {
    return `<script src="${item.fileName}" ${scriptAttrs}></script>`
  });

  return scriptItemList.join('\n');
}
function getScriptAttrs(attrs) {
  const attrItemList = [];
  for (const k in attrs) {
    const attrItem = `${k}="${attrs[k]}"`;
    attrItemList.push(attrItem);
  }
  return attrItemList.join(' ');
}
