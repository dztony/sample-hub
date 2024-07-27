import * as esbuild from 'esbuild';

async function main() {
  await esbuild.build({
    entryPoints: ['src/index.jsx'],
    entryNames: '[dir]/[name]-[hash]',
    bundle: true,
    // minify: true,
    sourcemap: true,
    platform: 'browser',
    target: [
      "chrome58",
      "firefox57",
      "safari11",
      "edge16",
    ],
    outfile: 'dist/out.js',
    format: 'esm',
    allowOverwrite: true,
    loader: {
      '.jpg': 'file',
      '.css': 'css',
      '.module.css': 'local-css',
    },
    assetNames: 'assets/[ext]/[name]-[hash]',
    jsx: 'preserve',
    keepNames: true,
    metafile: true,
  });
}

main();
