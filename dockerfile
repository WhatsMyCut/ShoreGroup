FROM node:lts
RUN mkdir /usr/src/app
RUN mkdir /usr/src/app/build
RUN mkdir /usr/src/app/src
RUN mkdir /usr/src/app/server
WORKDIR /usr/src/app
COPY package.json /usr/src/app/package.json
COPY src/index.html /usr/src/app/src/index.html
COPY build/ /usr/src/app/build/
COPY server/ /usr/src/app/server/
RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent
EXPOSE 80 443 22 8080 5003 2222
CMD ["npm", "run", "start:prod"]