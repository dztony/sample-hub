import fs from "fs";
import Bundle from "./bundle.js";

export default async function myRollup(entry, options = {}) {
  const bundle = new Bundle({entry, ...options});
  await bundle.build();
  return {
    generate(options) {
      bundle.generate(options)
    },
    write(dest, options = {}) {
      const { code } = bundle.generate({
        dest,
        format: options.format,
      });

      return fs.writeFile(dest, code, err => {
        if (err) {
          throw err;
        }
      });
    }
  };
}
