import path from "node:path";
import { rollup } from 'rollup';
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from '@rollup/plugin-node-resolve';

import RollupPluginEsbuildTransform from "./plugins/rollup-plugin-esbuild-transform";

async function main() {
  const entryHtml = path.join(process.cwd(), 'index.html');
  const entry = path.join(process.cwd(), 'src/main.tsx');
  const bundle = await rollup({
    input: {
      'jsx': entry,
    },
    plugins: [
      commonjs(),
      nodeResolve(),
      RollupPluginEsbuildTransform(),
    ],
  });
  await bundle.write({
    format: 'es',
    dir: 'dist/appDist',
    entryFileNames: "bundle.js",
  });
  await bundle.close();
}

main();
