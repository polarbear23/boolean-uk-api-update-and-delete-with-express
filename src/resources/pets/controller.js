const req = require("express/lib/request");
const Pet = require("./model");

async function createOne(req, res) {
    const petToCreate = {
        ...req.body
    }
    const createOne = Pet().createOnePet;
    const thisRes = await createOne(petToCreate, res);
    return res.json({ data: thisRes });
}

async function edit(req, res) {
    const petId = parseInt(req.params.identifier);
    if (!isNaN(petId)) {
        const petToEdit = {
            id: petId,
            ...req.body
        };
        console.log("editById :", petToEdit);
        const updatePet = Pet().updatePetById;
        const thisRes = await updatePet(petToEdit);
        return res.json({ data: thisRes });
    }
    else {
        const petToEdit = {
            name: req.params.identifier,
            ...req.body
        };
        console.log("editByName :", petToEdit);
        const updatePet = Pet().updatePetByName;
        const thisRes = await updatePet(petToEdit);
        return res.json({ data: thisRes });
    }
}

async function deleteById(req, res) {
    const petToDelete = req.params.id;

    console.log("deleteById petId:", petToDelete);
    const deletePet = Pet().deletePetById;
    const thisRes = await deletePet(petToDelete);
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


module.exports = {
    createOne,
    getAllTypes,
    getAll,
    edit,
    deleteById
}