import path from 'node:path';
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from '@rollup/plugin-node-resolve';

import RollupPluginEsbuildTransform from "./plugin/rollup-plugin-esbuild-transform.mjs";

const dirName = process.cwd();

export default {
  input: path.join(dirName, 'src/main.tsx'),
  output: {
    dir: path.join(dirName, 'dist/appDist'),
    entryFileNames: 'my_bundle.js'
  },
  plugins: [
    commonjs(),
    nodeResolve(),
    RollupPluginEsbuildTransform(),
  ],
};
