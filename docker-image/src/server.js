'use strict';

const express = require('express');

require('dotenv').config();

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.listen(process.env.SERVER_PORT, () => 
    console.log(`Server started at port ${process.env.SERVER_PORT}`));