FROM node-based-pm2

WORKDIR /stock-realtime-monitor

ADD ./dist ./dist

ADD ./package.json ./package.json

ADD ./public ./public

RUN npm install

CMD ["pm2-runtime", "./dist/bundle.js", "daemon-off"]
