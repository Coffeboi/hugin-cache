FROM node:16.3.0-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

ENV NODE_ENV=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]