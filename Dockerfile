FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy only the package.json file to install dependencies first
COPY package.json .

# Install the app's dependencies
RUN npm install

COPY ./tls.crt /etc/ssl/certs/tls.crt
COPY ./tls.key /etc/ssl/private/tls.key


# Copy the bin folder into the container
COPY ./src /app/src
COPY ./bin /app/bin
COPY . .


EXPOSE 443

CMD ["node", "/app/src/00.js"]
