import { readFileSync } from 'fs';
import { join } from 'path';

let fileContents: any;
let config: any;
try {
    fileContents = readFileSync(join(__dirname, '../secret.config.json'), 'utf-8');
    config = JSON.parse(fileContents);
} catch (err) {
    throw err;
}
export const SECRET_KEY = config.SECRET_KEY;
export const APP_NAME = 'fastify-typescript-docker-rest-api';
export const SERVER_PORT = 4000;
export const HTTP_PROTOCOL = 'http';
export const HTTP_HOSTNAME = 'localhost';

export enum URLS {
    GOOGLE_VERIFY  = 'https://www.googleapis.com/oauth2/v3/tokeninfo',
}

export const CCOLORS = {
    BgBlack: '\u001b[40m',
    BgBlue: '\u001b[44m',
    BgCyan: '\u001b[46m',
    BgGreen: '\u001b[42m',
    BgMagenta: '\u001b[45m',
    BgRed: '\u001b[41m',
    BgWhite: '\u001b[47m',
    BgYellow: '\u001b[43m',
    Blink: '\u001b[5m',
    Bright: '\u001b[1m',
    Dim: '\u001b[2m',
    FgBlack: '\u001b[30m',
    FgBlue: '\u001b[34m',
    FgCyan: '\u001b[36m',
    FgGreen: '\u001b[32m',
    FgMagenta: '\u001b[35m',
    FgRed: '\u001b[31m',
    FgWhite: '\u001b[37m',
    FgYellow: '\u001b[33m',
    Hidden: '\u001b[8m',
    Reset: '\u001b[0m',
    Reverse: '\u001b[7m',
    Underscore: '\u001b[4m',
};
