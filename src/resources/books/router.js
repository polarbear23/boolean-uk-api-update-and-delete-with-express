const express = require("express");
const { createOne, getFictionBooks, getNonFictionBooks, getBooksByAuthor, edit, deleteById } = require("./controller");
const router = express.Router();


router.post("/", createOne);
router.get("/fiction", getFictionBooks);
router.get("/non-fiction", getNonFictionBooks);
router.get("/author/:name", getBooksByAuthor);
router.put("/:identifier", edit);
router.delete("/:id", deleteById);



module.exports = router;

/*  curl -X PUT -H "Content-Type: application/json" -d '{"id":1,"title":"quia ea","type":"Fiction","author":"Myrtice Hartmann","topic":"horror","publicationdate":"2018-08-17T23:00:00.000Z"}' http://localhost:3030/books/1 */