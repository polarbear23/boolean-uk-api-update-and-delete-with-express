const Pet = require("./model");

async function createOne(req, res) {
    const petToCreate = {
        ...req.body
    }
    const createOne = Pet().createOnePet;
    const thisRes = await createOne(petToCreate, res);
    return res.json({ data: thisRes });
}

module.exports = {
    createOne
}