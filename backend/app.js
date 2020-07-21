const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postRoutes = require('./routes/posts');

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

app.use("/api/posts", postRoutes);

module.exports = app;
