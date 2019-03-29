#!/bin/bash


docker network rm my-net;
docker network create my-net;

docker run -p 6379:6379 --network my-net --name=redis -d redis:5.0.4;

docker run -it \
--name=node-redis-session-pm2 \
--publish 3000:3000 \
--volume="$PWD/src":/usr/src/app/src \
--network my-net \
node-redis-session-pm2;

#remove after run --rm