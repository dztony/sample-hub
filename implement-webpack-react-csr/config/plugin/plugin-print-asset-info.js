import chalk from 'chalk';

export default class PluginPrintAssetInfo {
  constructor() {
    this.compiler = null;
    this.pluginName = 'plugin-print-asset-info';
  }

  apply(compiler) {
    this.compiler = compiler;

    let startTime = 0;

    compiler.hooks.environment.tap(
      this.pluginName,
      (compilation, callback) => {
        startTime = new Date().getTime();
        console.log(chalk.green('开始打包'));
      },
    );

    compiler.hooks.afterEmit.tap(
      this.pluginName,
      (compilation) => {
        const outputDir = compilation.outputOptions.path;
        const fileMap = new Map();
        const fileList = Object.keys(compilation.assets);

        for (const filename of fileList) {
          const originSize = compilation.assets[filename].size();
          if (originSize < 1024) {
            fileMap.set(filename, originSize + ' b');
          } else {
            const kbSize = Math.floor(originSize / 1024) + ' kb';
            fileMap.set(filename, kbSize);
          }
        }

        for (const key of fileMap.keys()) {
          console.log(chalk.bold(fileMap.get(key)) + '\t' + chalk.dim(outputDir + '/') + chalk.cyan(key));
        }
      }
    );

    compiler.hooks.done.tap(
      this.pluginName,
      (compilation, callback) => {
        const costTime = new Date().getTime() - startTime;
        console.log(chalk.green(`打包完成，耗时 ${costTime} ms`));
      },
    )
  }
}