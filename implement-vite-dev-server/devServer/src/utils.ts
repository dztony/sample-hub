import { gray, green, yellow } from "picocolors";
import path from 'node:path';
import * as esbuild from "esbuild";
import MagicString from "magic-string";
import { parse, init } from "es-module-lexer";

export function printDeps(deps: Set<string>) {
  console.log(yellow(`预构建的依赖 (数量 - ${deps.size})`));
  deps.forEach(item => {
    console.log(green(`    ${item}`));
  });
}

export function parseFileLoader(filename: string) {
  return path.extname(filename).split('.')[1] as esbuild.Loader;
}

export const ServerPort = 3010;

export const RegImageType = /\.(svg|png|jpg|jpeg)/;
export const RegExternalType = /\.(css|svg|png|jpg|jpeg)$/;
export const RegThirdPartyLib = /^[\w@][^:]/;

export const ThirdPartyLibPrefix = '/@thirdPartyDeps/'
export const AssetSuffix = 'asset';

export const PreBuildLocation = path.join(process.cwd(), '/node_modules/.devServerCache');

export async function replaceImportStatement(originCode: string): Promise<string> {
  await init;
  const [imports] = parse(originCode);
  const codeStr = new MagicString(originCode);

  imports.forEach(item => {
    if (item.n) {
      if (RegThirdPartyLib.test(item.n as string)) {
        codeStr.update(item.s, item.e, ThirdPartyLibPrefix + item.n);
      }

      if (RegImageType.test(item.n as string)) {
        codeStr.update(item.s, item.e, item.n + `?${AssetSuffix}`);
      }
    }

  });

  return codeStr.toString();
}
