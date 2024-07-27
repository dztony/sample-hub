import * as esbuild from 'esbuild';
import { PreBuildLocation, RegThirdPartyLib } from "../utils";
import { blue, green, red, yellow } from "picocolors";
import * as resolve from "resolve";
import { Plugin } from "esbuild";

export async function preBuild(deps: Set<string>): Promise<void> {
  await esbuild.build({
    entryPoints: [...deps.values()],
    format: 'esm',
    platform: 'browser',
    bundle: true,
    write: true,
    outdir: PreBuildLocation,
    splitting: true,
    plugins: [
      EsbuildPluginBuildDeps(deps),
    ],
  });
}

const PreBuildPluginNamespace = 'namespace-pre-build-deps';

function EsbuildPluginBuildDeps(depSet: Set<string>): Plugin {
  return {
    name: 'esbuild-plugin-build-deps',
    setup(build) {
      build.onResolve(
        {
          filter: RegThirdPartyLib,
        },
        (resolveInfo) => {
          const { path: depId, importer, resolveDir } = resolveInfo;
          const isEntry = importer === '';
          if (depSet.has(depId)) {
            const depIdPath = resolve.sync(depId, {
              basedir: resolveDir,
            });
            // if (isEntry) {
            //   return {
            //     path: depIdPath,
            //     namespace: PreBuildPluginNamespace,
            //   };
            // } else {
            //   return {
            //     path: depIdPath,
            //   };
            // }
            return {
              path: depIdPath,
            };
          }
        },
      );

      // build.onLoad(
      //   {
      //     filter: /.*/,
      //     namespace: PreBuildPluginNamespace,
      //   },
      //   async (loadInfo: OnLoadArgs) => {
      //     console.log(green(JSON.stringify(loadInfo)));
      //     const depIdPath = loadInfo.path;
      //     const code = fs.readFileSync(depIdPath).toString() as string;
      //     const loader = parseFileLoader(depIdPath);
      //     return {
      //       loader: loader,
      //       contents: code,
      //       resolveDir: process.cwd() as string,
      //     };
      //   },
      // );

      // build.onEnd(result => {
      //   console.log(JSON.stringify(result, null, 2));
      // });
    },
  };
}
