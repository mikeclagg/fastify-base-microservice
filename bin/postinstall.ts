import { writeFileSync } from 'fs';
import { join }  from 'path';

const init = (config: any) => {
  const filepath = join('secret.config.json');
  try {
    writeFileSync(filepath, JSON.stringify(config, null, 2));
  } catch(err) {
    throw err;
  }
};

const seed = 'abcdefghijklnmopqrstuvwxyz0123456789ABCDEFGHIJKLNMOPQRSTUVWXYZ!@#$%^&*()-+='.split('');
const seedLen = seed.length;
const uidLen = 64;
let i = 0;
let secretKey = '';

while (i < uidLen) {
  const rand = Math.floor(Math.random() * seedLen);
  secretKey += seed[rand]
  i++;
}
console.log(secretKey);
init({
  SECRET_KEY: secretKey
});