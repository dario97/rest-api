const { Router } = require("express");
const router = Router();
const _ = require("lodash");

const books = require("../books.json");
const authors = require("../authors.json");
let bookId = 5;

router.get("/books", (req, res) => {
  let booksWithAuthors = [];
  for (let index = 0; index < books.length; index++) {
    const book = books[index];
    const author = authors.find((author) => author.id === book.authorId);
    let bookWithHisAuthor = { id: book.id, name: book.name, author };
    booksWithAuthors.push(bookWithHisAuthor);
  }
  res.json(booksWithAuthors);
});

router.post("/books", (req, res) => {
  const { name, authorId } = req.body;
  const auth = authors.find((author) => author.id === authorId);
  if (name && authorId && auth !== undefined) {
    const book = { bookId, ...req.body };
    books.push(book);
    res.json({ added: "ok" });
    bookId++;
  } else {
    res.status(400).json({ statusCode: "Bad request" });
  }
});

router.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  _.remove(books, (book) => {
    return book.id == id;
  });
  res.json(books);
});

router.put("/books/:id", (req, res) => {
  const id = req.params.id;
  const { name, authorId } = req.body;
  if (name || authorId) {
    let auth = true;
    if (authorId) {
      auth =
        authors.find((author) => author.id === authorId) != undefined
          ? true
          : false;
    }
    if (auth) {
      _.each(books, (book) => {
        if (book.id === id) {
          book.name = name != undefined ? name : book.name;
          book.authorId = authorId != undefined ? authorId : book.authorId;
        }
      });
      res.json({ modified: "ok" });
    } else {
      res.status(400).json({ statusCode: "Bad Request" });
    }
  } else {
    res.json({ modified: "No data affected" });
  }
});

module.exports = router;
