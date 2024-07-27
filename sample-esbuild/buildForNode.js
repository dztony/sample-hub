import * as esbuild from 'esbuild';

async function main() {
  await esbuild.build({
    entryPoints: ['src/index.jsx'],
    bundle: true,
    platform: 'node',
    packages: 'external',
    outfile: 'dist/out.js',
  });
}

main();
