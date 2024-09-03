FROM node:alpine

# Create app directory
RUN mkdir -p /usr/src
WORKDIR /usr/src



# Install app dependencies
COPY package.json /usr/src/
COPY package-lock.json /usr/src/
RUN npm install

# Bundle app source
COPY . /usr/src

# Determine the release version
RUN if [ -f /usr/src/baseversion ]; then \
        RELEASEVERSION=$(($(cat /usr/src/baseversion) + 0)); \
    else \
        RELEASEVERSION=0; \
    fi \
    && RELEASEDATE=$(date "+%a %b %d %T %Y") \
    && RELEASEDATEISO=$(date -u "+%Y-%m-%dT%H:%M:%SZ") \
    && echo "RELEASEVERSION=$RELEASEVERSION" > /usr/src/.env.production \
    && echo "RELEASEDATE=$RELEASEDATE" >> /usr/src/.env.production \
    && echo "RELEASEDATEISO=$RELEASEDATEISO" >> /usr/src/.env.production

# note that this doesn't actually publish the port to the host machine; it's more of an informational guideline.
EXPOSE 3000

CMD ["npm", "start"]