import { LocalesMapper } from "../config/locale.config.mjs";
import process from 'node:process';
import path from 'node:path';
import fs from 'node:fs';
import { nanoid } from "nanoid";

function __main() {
  console.log('gen i18n');
  const dirPath = path.join(process.cwd(), '/src/locales');

  for (const key of Object.keys(LocalesMapper)) {
    const filename = LocalesMapper[key];
    const filePath = path.join(dirPath, filename);
    console.log(filePath);
    const langDict = translationGenerator(key);
    fs.writeFileSync(filePath, JSON.stringify(langDict, null, 2));
  }
}

function translationGenerator(curLang) {
  const targetArray = Array(4000).fill(0);
  const res = {};

  targetArray.forEach((item, index) => {
    const translationKey = `key${index + 1}`;
    const translationValue = `${translationKey} for ${curLang} - ${nanoid(16)}`;
    res[translationKey] = translationValue;
  });

  return res;
}

__main();
