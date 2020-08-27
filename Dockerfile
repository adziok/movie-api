FROM node:14.8 as builder

ENV NODE_ENV build

WORKDIR /home/node

COPY . /home/node

RUN yarn

RUN yarn build


#------ prod build ------#
FROM node:14.8

ENV NODE_ENV production

WORKDIR /home/node

COPY --from=builder /home/node/package.json /home/node/

COPY --from=builder /home/node/dist/ /home/node/dist/

COPY --from=builder /home/node/production.env /home/node/production.env

RUN yarn --production

CMD ["node", "./dist/main.js"]
