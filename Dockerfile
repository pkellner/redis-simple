# Use an official node runtime as a parent image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./



# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Determine the release version from the root of the repo
RUN if [ -f ./baseversion ]; then \
        RELEASEVERSION=$(($(cat ./baseversion) + 0)); \
    else \
        RELEASEVERSION=0; \
    fi \
    && RELEASEDATE=$(date "+%a %b %d %T %Y") \
    && RELEASEDATEISO=$(date -u "+%Y-%m-%dT%H:%M:%SZ") \
    && echo "RELEASEVERSION=$RELEASEVERSION" > ./.env.production \
    && echo "RELEASEDATE=$RELEASEDATE" >> ./.env.production \
    && echo "RELEASEDATEISO=$RELEASEDATEISO" >> ./.env.production

# Build the Next.js app
RUN npm run build

# Start the Next.js app
CMD ["npm", "start"]

# Expose port 3000
EXPOSE 3000
