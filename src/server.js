const express = require('express');

require('dotenv').config();

const session = require('express-session');

const redis = require('redis');
const redisClient = redis.createClient({ host: 'redis', port: 6379});
const redisStore = require('connect-redis')(session);

// App
const app = express();

redisClient.on('error', (err) => {
    console.log('Redis error: ', err);
  });

app.use(session({
    secret: 'ThisIsHowYouUseRedisSessionStorage',
    name: '_redisPractice',
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, secure: false, maxAge: 600000000000000000 }, // Note that the cookie-parser module is no longer needed
    store: new redisStore({ host: 'redis', port: 6379, client: redisClient, ttl: 86400 }),
  }));

  app.get('/', function(req, res, next) {
    
    req.session.name="teste";
    res.send("teste");  
  });

app.get('/set', (req, res)=>{

    res.send('Ola ser'+req.session.name);

});

app.listen(process.env.SERVER_PORT, () => 
    console.log(`Server started at port ${process.env.SERVER_PORT}`));