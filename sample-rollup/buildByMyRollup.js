import { fileURLToPath } from 'node:url';
import path from "path";
import fs from "fs";

import myRollup from "./src/rollup.js";

async function main() {
  const dirname = getCurDirName();
  const entry = path.join(dirname, '/demo/main.js');
  const output = path.join(dirname, '/distMy/bundle.js');
  prepare(output);

  const res = await myRollup(entry);
  res.write(output);
}

function getCurDirName() {
  return path.dirname(fileURLToPath(import.meta.url));
}

function prepare(output) {
  if (!fs.existsSync(path.dirname(output))) {
    fs.mkdirSync(path.dirname(output));
  }

  if (!fs.existsSync(output)) {
    fs.writeFileSync(output, '');
  }
}

main();
