import { getDeps } from "./depsParser";
import { preBuild } from "./depsPrebuild";
import { green } from "picocolors";

export async function depsPreBuildMainWork() {
  const startTime = Date.now();
  const deps = await getDeps();
  await preBuild(deps);
  const costTime = (Date.now() - startTime) + '';
  console.log(green(`开发服务器启动耗时 - ${costTime} ms`));
}
