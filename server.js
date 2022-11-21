const express = require("express");
const mongoose = require("mongoose");
const articleRouter = require("./routes/articles");
const app = express();
const Article = require('./models/article')
const methodOverride = require('method-override')


 mongoose.connect("mongodb://127.0.0.1/blog", {useNewUrlParser: true,
 useUnifiedTopology: true});


// if we want to render the html or ejs, we have to set up the view engine
// view engine will convert ejs to html code
app.set("view engine", "ejs");
// this means we can access the body parameter
app.use(express.urlencoded({ extended: false }))

app.use(methodOverride('_method'))

// now we need to use the route that we have created in article router
// defining the static prefix of the router, it is better to give prefix to avoid route conflicts
app.use("/articles", articleRouter);


// get home route
// just pass the path of the file that we want to render
app.get("/", async (req, res) => {
  const articles = await Article.find().sort({createdAt: "desc"})
  // we can pass the objects into our article
  res.render("articles/index", { articles: articles });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
