import { sendJson } from '../lib/utils';

const packageInfo = require('../../../package.json');

exports.handler = async function (event: any, context: any, callback: any) {
  sendJson(callback, 200, { version: packageInfo.version });
};
