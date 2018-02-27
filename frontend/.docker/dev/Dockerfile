FROM node:8.9.3

WORKDIR /frontend

# NB: Only copy files that are required by 'npm install'
# The 'src' directory will be mounted as a shared volume by docker-compose (allowing for live-reload)
#COPY package.json .
#COPY package-lock.json .
#COPY gulpfile.ts .
#COPY tsconfig.json .
#COPY tslint.json .
#COPY tools ./tools/

# before switching to non-root user, change ownership of home
#RUN chown -R node:node .
#USER node

EXPOSE 5555

RUN npm install
