import * as esbuild from 'esbuild';
import path from 'node:path';
import { green } from "picocolors";
import { printDeps, RegExternalType, RegThirdPartyLib } from "../utils";

export async function getDeps() {
  const deps = new Set<string>();
  const entry = path.join(process.cwd(), 'src/main.tsx');

  await esbuild.build({
    entryPoints: [entry],
    plugins: [
      EsbuildPluginDepsCollection(deps),
    ],
    bundle: true,
    write: false,
  });

  return deps;
}

function EsbuildPluginDepsCollection(deps: Set<string>): esbuild.Plugin {
  return {
    name: 'esbuild-plugin-deps-collection',
    setup(build) {
      build.onResolve(
        {
          filter: RegExternalType,
        },
        (resolveInfo) => {
          return {
            path: resolveInfo.path,
            external: true,
          };
        },
      )

      build.onResolve(
        {
          filter: RegThirdPartyLib,
        },
        (resolveInfo) => {
          const { path: id } = resolveInfo;
          // console.log(green(JSON.stringify(resolveInfo, null, 2)));
          deps.add(id);
          return {
            path: id,
            external: true,
          };
        },
      );

      build.onEnd(result => {
        printDeps(deps);
      });
    },
  };
}
