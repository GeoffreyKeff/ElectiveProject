FROM node:18
WORKDIR /srv/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run start
EXPOSE 3000
CMD ["node", "build/index.js"]