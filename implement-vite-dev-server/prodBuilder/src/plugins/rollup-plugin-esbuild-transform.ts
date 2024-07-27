import * as esbuild from 'esbuild';
import color from 'picocolors';
import { Plugin } from 'rollup';

export default function RollupPluginEsbuildTransform(): Plugin {
  return {
    name: 'rollup-plugin-esbuild-transform',
    buildStart(inputOptions) {
      console.log(color.red('****esbuild-transform start****'));
    },
    async transform(code, id) {
      const loader = getLoaderById(id);
      console.log(color.yellow(id));
      const transformResult = await esbuild.transform(code, {
        format: 'esm',
        loader: loader,
        target: 'es6',
        sourcemap: true,
        define: {
          'process.env.NODE_ENV': '"production"',
        },
      });
      return {
        code: transformResult.code,
        map: transformResult.map,
      };
    },
    buildEnd() {
      console.log(color.red('****esbuild-transform end****'));
    },
  };
}

function parseExtnameById(id: string): string {
  const charList = id.split('.');
  return charList[charList.length - 1];
}

function getLoaderByExtname(extname: string) {
  const loaderList = ['js', 'jsx', 'ts', 'tsx'];
  if (loaderList.includes(extname)) {
    return extname;
  } else {
    return loaderList[0];
  }
}

function getLoaderById(id: string) {
  const extname = parseExtnameById(id);
  return getLoaderByExtname(extname) as esbuild.Loader;
}
