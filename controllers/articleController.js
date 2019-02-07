var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = {
  getArticles: function(req, res) {
    db.Article.find({ isSaved: false })
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  },
  getArticle: function(req, res) {
    db.Article.findOne({ _id: req.params.id })

      .populate("note")
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  },
  createArticle: function(req, res) {
    db.Note.create(req.body)
      .then(function(dbNote) {
        return db.Article.findOneAndUpdate(
          { _id: req.params.id },
          { note: dbNote._id },
          { new: true }
        );
      })
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  },
  scrapeArticles: function(req, res) {
    axios
      .get("https://www.npr.org/sections/strange-news/")
      .then(function(response) {
        var $ = cheerio.load(response.data);

        $("article h2").each(function(i, element) {
          var result = {};

          result.title = $(this)
            .children("a")
            .text();
          result.link = $(this)
            .children("a")
            .attr("href");

          db.Article.create(result)
            .then(function(dbArticle) {
              console.log(dbArticle);
            })
            .catch(function(err) {
              console.log(err);
            });
        });

        res.send("Scrape Complete");
      });
  },
  clearArticles: function(req, res) {
    db.Article.remove({})
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  },
  saveArticle: function(req, res) {
    db.Article.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { isSaved: true } }
    )
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  },
  showSavedArticles: function(req, res) {
    db.Article.find({ isSaved: true })
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  }
};
