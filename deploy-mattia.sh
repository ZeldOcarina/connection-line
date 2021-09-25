#!/bin/bash
#npm run build
#/home/Mattia/.nvm/versions/node/v12.18.2/bin/
tar czfv connectionline.tar.gz config content controller models public routes src utils views .babelrc app.js package.json package-lock.json postcss.config.js server.js webpack.* ecosystem.config.js
scp connectionline.tar.gz staging.connectionline.ch:/home/Mattia/
rm connectionline.tar.gz

ssh Mattia@connectionline.ch << 'ENDSSH'

cd /home/Mattia/connectionline.ch
pm2 stop ecosystem.config.js
rm -rf config content controller models public routes src utils views .babelrc app.js package.json package-lock.json postcss.config.js server.js webpack.* ecosystem.config.js node_modules
cd /home/Mattia/
tar xf connectionline.tar.gz -C /home/Mattia/connectionline.ch
rm -f connectionline.tar.gz
cd /home/Mattia/connectionline.ch
npm install --production
pm2 start ecosystem.config.js
exit
ENDSSH