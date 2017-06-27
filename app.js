var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// APP config
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// MONGOOSE/MODEL config
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);
// Blog.create({
//   title: "Test",
//   image: "https://farm1.staticflickr.com/66/158583580_79e1c5f121.jpg",
//   body: "This is a blog post for test purposes"
// });

// RESTFUL ROUTES
app.get("/", function(req, res) {
  res.redirect("/blogs");
});

// INDEX ROUTE
app.get("/blogs", function(req, res) {
  Blog.find({}, function(error, result) {
    if(error) {
      console.log("ERROR!");
    } else {
      res.render("index", {posts: result});
    }
  });
});

// NEW ROUTE
app.get("/blogs/new", function(req, res) {
  res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res) {
  // create blog
  Blog.create(req.body.blog, function(error, result) {
    if(error) {
      res.render("new");
    } else {
      res.redirect("/blogs");
    }
  });
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res) {
  Blog.findById(req.params.id, function(error, result) {
    if(error) {
      res.redirect("/blogs");
    } else {
      res.render("show", {post: result});
    }
  });
});

app.listen(3000, function() {
  console.log("Listening Port 3000...");
});