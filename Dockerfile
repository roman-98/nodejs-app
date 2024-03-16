FROM node:latest
WORKDIR /nodejs-app
ADD . .
RUN npm install
CMD ["node", "index.js"]