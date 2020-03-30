const { writeFileSync } = require('fs');
const { join } = require('path');
const md5 = require('md5');

const init = config => {
  const filepath = join(__dirname, '../secret.config.json');
  try {
    writeFileSync(filepath, JSON.stringify(config, null, 2));
  } catch(err) {
    throw err;
  }
};

const seed = 'abcdefghijklnmopqrstuvwxyz0123456789ABCDEFGHIJKLNMOPQRSTUVWXYZ!@#$%^&*()-+='.split('');
const seedLen = seed.length;
const uidLen = 64;
let i = 0, secretKey = '';
while (i < uidLen) {
  const rand = Math.floor(Math.random() * seedLen);
  secretKey += seed[rand]
  i++;
}

init({
  SECRET_KEY: secretKey
});