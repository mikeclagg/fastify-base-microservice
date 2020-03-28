FROM node:latest

WORKDIR /usr/app
COPY package.json package.json
RUN npm install --no-package-lock
RUN npm install bcrypt

COPY . .
EXPOSE 4000
EXPOSE 9229

# CMD [ "npx", "nodemon", "-x", "ts-node", "src/index.ts" ]
CMD [ "npm", "run", "dev" ]