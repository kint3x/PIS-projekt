FROM node:lts-hydrogen

ENV NODE_OPTIONS="--openssl-legacy-provider"

WORKDIR /opt/app

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "start"]
