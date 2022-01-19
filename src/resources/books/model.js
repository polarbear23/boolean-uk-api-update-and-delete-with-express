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

  createTable().then(() => {
    console.log("\nCreating mock data for Books...\n");

    mockData();
  });

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

  return {
    createOneBook
  }
}

module.exports = Book;


/*
curl -X POST -H "Content-Type: application/json" \
-d '{"title": "bob goes to school", "type": "dogerbook", "author": "king doge", "topic": "types of Doge", "publicationDate":"2017-10-04"}' \
 http://localhost:3030/books
*/