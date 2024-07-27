import { nodeResolve as pluginNodeResolve } from '@rollup/plugin-node-resolve';
import pluginTerser from '@rollup/plugin-terser';
import pluginBabel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import pluginReplace from '@rollup/plugin-replace';
import pluginPostcss from 'rollup-plugin-postcss';
import pluginImage from '@rollup/plugin-image';

import pluginClearOutputDir from './plugin/rollup-plugin-clear-output-dir.js';
import pluginGenerateHtml from './plugin/rollup-plugin-generate-html.js';
import pluginDevServer from './plugin/rollup-plugin-dev-server.js';


export default {
  input: "demo/main.js",
  output: {
    dir: 'dist',
    format: 'es',
    entryFileNames: '[name].js',
    banner: `/* 当前的应用版本为 1.0.0 */`,
    footer: '/* 尾部的注释 */',
  },
  plugins: [
    pluginClearOutputDir(),
    pluginGenerateHtml(),
    pluginDevServer({
      port: 3500,
      isDev: process.env.ENV_MODE === 'dev',
    }),

    pluginNodeResolve(),
    // pluginTerser(), // 代码压缩
    commonjs(),
    pluginBabel({
      presets: ['@babel/preset-react'],
      babelHelpers: 'bundled',
      exclude: ['node_modules/*'],
      compact: false,
    }),
    pluginReplace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'preventAssignment': true,
    }),
    pluginPostcss({
      modules: true,
      // extract: true,
      plugins: [],
    }),
    pluginImage(),
  ],
};
