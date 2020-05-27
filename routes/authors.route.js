const { Router } = require("express");
const router = Router();
const authors = require("../authors.json");
const books = require("../books.json");
const _ = require("lodash");
let authorId = 3;

router.get("/authors", (req, res) => {
  res.json(authors);
});

router.post("/authors", (req, res) => {
  const { name, lastName } = req.body;
  if (name && lastName) {
    const author = { authorId, ...req.body };
    authors.push(author);
    authorId++;
    res.json({ added: "ok" });
  } else {
    res.status(400).json({ statusCode: "Bad request" });
  }
});

router.put("/authors/:id", (req, res) => {
  const id = req.params.id;
  const { name, lastName } = req.body;
  if (name || lastName) {
    _.each(authors, (author) => {
      if (author.id === id) {
        author.name = name != undefined ? name : author.name;
        author.lastname = lastName != undefined ? lastName : author.lastname;
      }
    });
  } else {
    res.json({ modified: "No data affected" });
  }
  res.json({ modified: "ok" });
});

router.delete("/authors/:id", (req, res) => {
  const id = req.params.id;
  const book = books.find((book) => book.authorId === id);
  console.log(book);
  if (book === undefined) {
    _.remove(authors, (author) => {
      return author.id === id;
    });
    res.json(authors);
  } else {
    res.status(400).json({ statusCode: "Bad request" });
  }
});

module.exports = router;
