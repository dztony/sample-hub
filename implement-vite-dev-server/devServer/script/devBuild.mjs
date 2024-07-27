import * as esbuild from 'esbuild';
import path from 'node:path';
import color from 'picocolors';


async function main() {
  const startTime = performance.now();
  const entry = path.join(process.cwd(), 'devServer/src/start.ts');
  const output = path.join(process.cwd(), 'dist/devServerDist/start.cjs');
  await esbuild.build({
    entryPoints: [entry],
    bundle: true,
    outfile: output,
    format: 'cjs',
    write: true,
    charset: 'utf8',
    platform: 'node',
    external: ['esbuild'],
  });
  const costTime = performance.now() - startTime + '';
  console.log(color.blue(`esbuild 耗时 - ${parseFloat(costTime).toFixed(2)} ms`));
}

main();
