var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    db.Article.find({ where: { isSaved: false } }).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/articles", function(req, res) {
    db.Article.find({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/articles/:id", function(req, res) {
    db.Article.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("index", {
        example: dbExample
      });
    });
  });

  app.get("/saved", function(req, res) {
    db.Article.find({ where: { isSaved: true } }).then(function(dbExample) {
      res.render("saved", {
        example: dbExample
      });
    });
  });

  app.get("*", function(req, res) {
    res.render("404");
  });
};
