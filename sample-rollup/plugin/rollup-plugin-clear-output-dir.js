import { rimrafSync } from 'rimraf';

export default function clearOutputDir() {
  return {
    name: 'clear-output-dir',
    version: '1.0.0',
    load(id) {
      // console.log('load hook id - ', id);
    },
    renderChunk(code, chunk, options, meta) {
      // console.log('hook renderChunk chunk - ', JSON.stringify(chunk, null, 2));
    },
    generateBundle(outputOptions, bundle) {
      // 清空产物目录
      const outputDir = outputOptions.dir;
      rimrafSync(outputDir);
    },
  };
}
