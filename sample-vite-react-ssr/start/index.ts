import express from 'express';
import { readFileSync } from 'node:fs';
import path from 'node:path';


async function main() {
  const app = express();
  const port = 4010;

  // app.use(express.static('dist/client'));

  app.get('/', async (req, res) => {
    // @ts-ignore
    const render = (await import('../dist/server/server.js')).render;
    const { html } = render();

    const templatePath = path.join(process.cwd(), 'dist/client/index.html');
    const originTemplate = readFileSync(templatePath).toString();
    const returnTemplate = originTemplate.replace('<!-- APP_OUTLET -->', html);

    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.send(returnTemplate);
  });

  app.use(express.static('dist/client'));


  app.listen(port, () => {
    console.log(`Server start at http://localhost:${port}`);
  });
}

main();
