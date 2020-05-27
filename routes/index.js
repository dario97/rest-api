const { Router } = require("express");
const router = Router();
const books = require("./books.route");
const authors = require("./authors.route");

router.use("/api", books);
router.use("/api", authors);

module.exports = router;
