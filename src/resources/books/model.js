const db = require("../../utils/database");
const { buildBooksDatabase } = require("../../utils/mockData");

function Book() {
  function createTable() {
    const sql = `
    DROP TABLE IF EXISTS books;
     CREATE TABLE IF NOT EXISTS books (
        id              SERIAL        PRIMARY KEY,
        title           VARCHAR(255)   NOT NULL,
        type            VARCHAR(255)   NOT NULL,
        author          VARCHAR(255)   NOT NULL,
        topic           VARCHAR(255)   NOT NULL,
        publicationDate DATE           NOT NULL 
      );
    `;

    return db
      .query(sql)
      .then((result) => console.log("[DB] Book table ready."))
      .catch(console.error);
  }

  function mockData() {
    const createBook = `
      INSERT INTO books
        (title, type, author, topic, publicationDate)
      VALUES
        ($1, $2, $3, $4, $5)
    `;

    const books = buildBooksDatabase();

    books.forEach((book) => {
      db.query(createBook, Object.values(book)).catch(console.error);
    });
  }

  function init() {
    createTable().then(() => {
      console.log("\nCreating mock data for Books...\n");

      mockData();
    });
  }


  function createOneBook(book) {
    const createBook = `
  INSERT INTO books
  (title, type, author, topic, publicationDate)
VALUES
  ($1, $2, $3, $4, $5)`

    return db.query(createBook, [book.title, book.type, book.author, book.topic, book.publicationDate])
      .then((result) => result.rows[0])
      .catch(console.error)
  }

  const updateBookById = (book) => {
    const updateBookByIdSQL = `
    UPDATE books
    SET title = $2,
    type = $3,
    author = $4,
    topic = $5,
    publicationDate = $6
    WHERE id = $1
    RETURNING *;
    `
    console.log("updateById Book:", book);

    return db
      .query(updateBookByIdSQL, [book.id, book.title, book.type, book.author, book.topic, book.publicationdate])
      .then((result) => result.rows[0])
      .catch(console.error);
  }


  const deleteBookById = (idOfBook) => {
    const deleteBookByIdSQL = `
    DELETE FROM books
    WHERE id = $1`

    return db.query(deleteBookByIdSQL, [idOfBook])
      .then(result => result.rows[0])
      .catch(console.error)
  }

  const updateBookByTitle = (book) => {
    const updateBookByTitleSQL = `
    UPDATE books
    SET type = $2,
    author = $3,
    topic = $4,
    publicationDate = $5
    WHERE title = $1
    RETURNING *;
    `
    return db
      .query(updateBookByTitleSQL, [book.title, book.type, book.author, book.topic, book.publicationdate])
      .then((result) => result.rows[0])
      .catch(console.error);
  }

  function getAllFictionBooks() {
    const getFictionBooksSQL = `
  SELECT * FROM books
  WHERE type = 'Fiction'
  `

    return db.query(getFictionBooksSQL)
      .then((result) => {
        console.log("Used get request to fetch fiction books", result.rows)
        return result.rows;
      })
      .catch(console.error);
  }

  function getFictionBooksByTopic(req, res) {
    const getFictionBookByTopicSQL = `
    SELECT * FROM books
    WHERE topic = $1
  `

    return db.query(getFictionBookByTopicSQL, [req.query.topic])
      .then((result) => {
        console.log("Used get request to fetch fiction books by topic", result.rows)
        return result.rows;
      })
      .catch(console.error);

  }
  function getNonFictionBooksByTopic(req, res) {
    const getNonFictionBookByTopicSQL = `
    SELECT * FROM books
    WHERE topic = $1
  `

    return db.query(getNonFictionBookByTopicSQL, [req.query.topic])
      .then((result) => {
        console.log("Used get request to fetch fiction books by topic", result.rows)
        return result.rows;
      })
      .catch(console.error);

  }


  function getAllNonFictionBooks() {
    const getNonFictionBooksSQL = `
  SELECT * FROM books
  WHERE type = 'Non-Fiction'
  `

    return db.query(getNonFictionBooksSQL)
      .then((result) => {
        console.log("Used get request to fetch fiction books", result.rows)
        return result.rows;
      })
      .catch(console.error);
  }

  function getAllBooksByAuthor(author) {
    let getAllBooksByAuthorSQL = `
    SELECT * FROM books
    WHERE author = $1
    `

    return db.query(getAllBooksByAuthorSQL, [author])
      .then((result) => {
        console.log("Used get request to fetch books by Author", result.rows)
        return result.rows;
      })
      .catch(console.error);
  }

  function getAllBooksByAuthorSorted(author) {
    let getAllBooksByAuthorSQL = `
    SELECT * FROM books
    WHERE author = $1
    ORDER BY publicationDate DESC
    `

    return db.query(getAllBooksByAuthorSQL, [author])
      .then((result) => {
        console.log("Used get request to fetch books by Author", result.rows)
        return result.rows;
      })
      .catch(console.error);
  }

  return {
    init, createOneBook,
    getAllFictionBooks,
    getFictionBooksByTopic,
    getAllNonFictionBooks,
    getNonFictionBooksByTopic,
    getAllBooksByAuthor,
    getAllBooksByAuthorSorted,
    updateBookById
    , deleteBookById
    , updateBookByTitle
  }
}

module.exports = Book;


/*
curl -X DELETE http://localhost:3030/books/1
*/