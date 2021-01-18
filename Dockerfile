FROM node:lts-alpine
WORKDIR /usr/src/app
COPY bGames-CloudDesktopCommunicationService/package*.json ./
RUN npm install
COPY bGames-CloudDesktopCommunicationService ./
RUN ls -l
CMD ["npm", "run", "prod"]