const Pet = require("./model");

async function createOne(req, res) {
    const petToCreate = {
        ...req.body
    }
    const createOne = Pet().createOnePet;
    const thisRes = await createOne(petToCreate, res);
    return res.json({ data: thisRes });
}

async function getAllTypes(req, res) {
    console.log("getting types");

    if (req.params.type !== "types") {
        if (req.query.microchip !== undefined) {
            const getPetsByTypeAndMicrochip = Pet().getPetsByTypeAndMicrochip;
            const thisRes = await getPetsByTypeAndMicrochip(req, res);
            return res.json({ data: thisRes });
        }
        const getPetsByType = Pet().getPetsByType;
        const thisRes = await getPetsByType(req, res);
        return res.json({ data: thisRes });
    }
    const getAllTypes = Pet().getTypes;
    const thisRes = await getAllTypes(res);
    return res.json({ data: thisRes });
}

async function getAll(req, res) {
    console.log("getting All");
    if (req.query.microchip !== undefined) {
        console.log("getting All filtered with microchip");
        const getAllByMicrochip = Pet().getAllByMicrochip;
        const thisRes = await getAllByMicrochip(req, res);
        return res.json({ data: thisRes });
    }
    const getAll = Pet().getAllPets;
    const thisRes = await getAll(res);
    return res.json({ data: thisRes });
}

async function getByMicrochip(req, res) {
    const getAllByMicrochip = Pet().getAllByMicrochip;
    const thisRes = await getAllByMicrochip(req, res);
    return res.json({ data: thisRes });
}
module.exports = {
    createOne,
    getAllTypes,
    getAll
}