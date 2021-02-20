### STAGE 1 : BUILD ###
FROM node:14.15.5 as build

WORKDIR /app

COPY package.json package-lock.json  ./


RUN npm install

COPY . .



RUN npm install -g @angular/cli@10.0.0

RUN npm run build

RUN ls

### STAGE 2 : RUN ###

FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf

### Step required => go angular.json and change outputPath    ###
### it should be like the following line only "dist", remove the  project name ###
###"outputPath": "dist"#

###COPY --from=build /usr/app/dist /usr/share/nginx/html
COPY --from=build /app/dist /usr/share/nginx/html
RUN ls -a /usr/share/nginx/html
