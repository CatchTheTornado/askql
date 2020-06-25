import * as shell from 'shelljs';

shell.mkdir('-p', 'dist/playground/public/');
shell.cp('-R', 'src/playground/public/assets/css', 'dist/playground/public/');
shell.cp('-R', 'src/playground/views', 'dist/playground');
