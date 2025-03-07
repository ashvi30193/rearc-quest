FROM node:18

# Set the working directory inside the container
WORKDIR /app

COPY package.json .

# Install the app's dependencies
RUN npm install

# Copy the locally generated tls key and cert for TLS
COPY ./tls.crt /etc/ssl/certs/tls.crt
COPY ./tls.key /etc/ssl/private/tls.key


# Copy the required folder into the container
COPY ./src /app/src
COPY ./bin /app/bin
COPY . .


EXPOSE 443

CMD ["node", "/app/src/00.js"]
