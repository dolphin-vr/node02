FROM node
WORKDIR /home/node02
COPY . .
RUN yarn install
EXPOSE 3000
CMD ["node", "server"]