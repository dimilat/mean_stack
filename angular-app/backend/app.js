const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

// database pass 8tCpizVYVPGvwPa2, dimilat
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
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content : req.body.content ,
  });
  post.save().then( createdPost => {
    res.status(201).json({
      message: 'Post added succesfully',
      postId: createdPost._id
    });
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: 'Posts fetched succesfully',
      posts: documents
    });
  });
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({
      message: 'Post deleted',
    });
  })
});

module.exports = app;
