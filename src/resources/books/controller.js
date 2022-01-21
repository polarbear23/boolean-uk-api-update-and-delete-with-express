const Book = require("./model");


async function createOne(req, res) {

    const bookToCreate = {
        ...req.body
    }
    const createOne = Book().createOneBook;
    const thisRes = await createOne(bookToCreate, res);
    return res.json({ data: thisRes });
}

async function edit(req, res) {
    const bookId = parseInt(req.params.identifier);
    if (!isNaN(bookId)) {
        const bookToEdit = {
            id: bookId,
            ...req.body
        };
        console.log("editById :", bookToEdit);
        const updateBook = Book().updateBookById;
        const thisRes = await updateBook(bookToEdit);
        return res.json({ data: thisRes });
    }
    else {
        const identifier = req.params.identifier;
        const bookTitle = identifier.replace(/-/g, " ");
        const bookToEdit = {
            title: bookTitle,
            ...req.body
        };
        console.log("editByName :", bookToEdit);
        const updateBook = Book().updateBookByTitle;
        const thisRes = await updateBook(bookToEdit);
        return res.json({ data: thisRes });
    }
}

async function deleteById(req, res) {
    const bookToDelete = req.params.id;

    console.log("deleteById BookId:", bookToDelete);
    const deleteBook = Book().deleteBookById;
    const thisRes = await deleteBook(bookToDelete);
    return res.json({ data: thisRes });
}

async function getFictionBooks(req, res) {
    if (req.query.topic !== undefined) {
        console.log("Fetch fiction book with topic=", req.query.topic);
        const getFictionBookByTopic = Book().getFictionBooksByTopic;
        const thisRes = await getFictionBookByTopic(req, res);
        return res.json({ data: thisRes });
    }
    else {
        const getFictionBooks = Book().getAllFictionBooks;
        const thisRes = await getFictionBooks(res);
        return res.json({ data: thisRes });
    }
}

async function getNonFictionBooks(req, res) {

    if (req.query.topic !== undefined) {
        console.log("Fetch fiction book with topic=", req.query.topic);
        const getNonFictionBookByTopic = Book().getNonFictionBooksByTopic;
        const thisRes = await getNonFictionBookByTopic(req, res);
        return res.json({ data: thisRes });
    }

    const getNonFictionBooks = Book().getAllNonFictionBooks;
    const thisRes = await getNonFictionBooks(res);
    return res.json({ data: thisRes });
}


async function getBooksByAuthor(req, res) {
    const authorName = req.params.name;
    const authorNameParsed = authorName.replace("-", " ");
    console.log(authorNameParsed);

    if (req.query.order !== undefined) {
        console.log("Fetch authors book with sortby", req.query.order);
        const getAllBooksByAuthor = Book().getAllBooksByAuthorSorted;
        const thisRes = await getAllBooksByAuthor(authorNameParsed);
        return res.json({ data: thisRes });
    }

    const getAllBooksByAuthor = Book().getAllBooksByAuthor;
    const thisRes = await getAllBooksByAuthor(authorNameParsed);
    return res.json({ data: thisRes });
}

module.exports = { createOne, getFictionBooks, getNonFictionBooks, getBooksByAuthor, edit, deleteById }   