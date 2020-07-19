const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://gauti13:9bA9NFbDL6JGk4g@cluster0.phwxp.mongodb.net/node-angular?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to database!")
  }).catch(() => {
    console.log("Connecttion failed")
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//handling cors error middliware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title : req.body.title,
    content : req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message : 'Post added successfully',
      postId : createdPost._id
    });
  });

});

app.put("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title : req.body.title,
    content : req.body.content
  })
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log(result);
    res.status(200).json({ message: "update successful" });
  })
});

app.get('/api/posts', (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message : 'Posts fetched successfully',
      posts : documents
    });
  });
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({
    _id : req.params.id
  }).then(result => {
    console.log(result);
    res.status(200).json({
      message : "Post deleted!"
    });
  });

});

module.exports = app;