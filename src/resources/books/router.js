const express = require("express");
const { createOne, getFictionBooks, getNonFictionBooks, getBooksByAuthor } = require("./controller");
const router = express.Router();


router.post("/", createOne);
router.get("/fiction", getFictionBooks);
router.get("/non-fiction", getNonFictionBooks);
router.get("/author/:name", getBooksByAuthor);


module.exports = router;