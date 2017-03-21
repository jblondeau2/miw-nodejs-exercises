FROM node:7.7.1

WORKDIR /var/www

# installing gulp
RUN npm init -y

# Npm install
RUN npm install -g nodemon

CMD ["nodemon", "-L", "./bin/www"]

EXPOSE 3000