// This file compiles .handlebars file to a static HTML.
// It is useful for deploying Playground frontend to a static hosting, such as Netlify.

import * as handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

if (process.argv.length != 4) {
  console.error(
    `Usage: node ${path.basename(
      __filename
    )} <.handlebars file> <destination html file>`
  );
  process.exit(1);
}
const handlebarsPath = process.argv[2];
const destinationPath = process.argv[3];

const template = handlebars.compile(fs.readFileSync(handlebarsPath).toString());
const html = template({
  title: 'AskScript Playground',
  askscriptServerUrl: process.env.PLAYGROUND_ASK_SERVER_URL,
  gtm: process.env.GTM, // Google Tag Manager code
});
fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
fs.writeFileSync(destinationPath, html);
