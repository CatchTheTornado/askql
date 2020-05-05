const fs = require('fs');
const path = require('path');

import { script } from '..';

test('test stub', () => {
  const code = fs
    .readFileSync(
      path.join(__dirname, '../askscript/__tests__/code/program01-ask.ask')
    )
    .toString();
  // console.log(script.parser.parse(code));
});
