FROM node:5-slim

WORKDIR /var/www

# Npm install
RUN npm install -g nodemon

CMD ["nodemon", "-L", "./bin/www"]

EXPOSE 3000