import { join } from 'path';
import { readFileSync } from 'fs';
let fileContents: any;
let config: any;
try {
    fileContents = readFileSync(join(__dirname, ), 'utf-8');
    config = JSON.parse(fileContents);
} catch(err) {
    throw err;
}
export const SECRET_KEY = config.SECRET_KEY;
export const APP_NAME = 'fastify-typescript-docker-rest-api';
export const SERVER_PORT = 4000;
export const HTTP_PROTOCOL = 'http';
export const HTTP_HOSTNAME = 'localhost';

export enum URLS {
    GOOGLE_VERIFY  = 'https://www.googleapis.com/oauth2/v3/tokeninfo'
}

export const CCOLORS = {
    Reset: '\x1b[0m',
    Bright: '\x1b[1m',
    Dim: '\x1b[2m',
    Underscore: '\x1b[4m',
    Blink: '\x1b[5m',
    Reverse: '\x1b[7m',
    Hidden: '\x1b[8m',

    FgBlack: '\x1b[30m',
    FgRed: '\x1b[31m',
    FgGreen: '\x1b[32m',
    FgYellow: '\x1b[33m',
    FgBlue: '\x1b[34m',
    FgMagenta: '\x1b[35m',
    FgCyan: '\x1b[36m',
    FgWhite: '\x1b[37m',

    BgBlack: '\x1b[40m',
    BgRed: '\x1b[41m',
    BgGreen: '\x1b[42m',
    BgYellow: '\x1b[43m',
    BgBlue: '\x1b[44m',
    BgMagenta: '\x1b[45m',
    BgCyan: '\x1b[46m',
    BgWhite: '\x1b[47m'
};
