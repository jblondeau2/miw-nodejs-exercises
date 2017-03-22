FROM node:7.7.1

WORKDIR /var/www

# installing gulp
RUN npm init -y

# Npm install
RUN npm install -g nodemon
RUN npm install express-generator -g


CMD ["nodemon", "-L", "./bin/www"]
#CMD ["nodemon", "-L", "./index.js"]

EXPOSE 3000