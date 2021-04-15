const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();

// database email: dimilathian77@gmail.com
// database username: dimilat
// database password: 8tCpizVYVPGvwPa2
mongoose.connect('mongodb+srv://dimilat:8tCpizVYVPGvwPa2@meanproject.7awv6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to mongoDB');
  })
  .catch(() => {
    console.log('Connection failed to mongoDB');
  });

app.use(bodyParser()); //Now deprecated
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join("backend/images")));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
  next();
});

app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
