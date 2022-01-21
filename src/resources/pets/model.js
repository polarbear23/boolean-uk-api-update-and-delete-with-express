const db = require("../../utils/database");
const { buildAnimalDatabase } = require("../../utils/mockData");

function Pet() {
  function createTable() {
    const sql = `
      DROP TABLE IF EXISTS pets;

      CREATE TABLE IF NOT EXISTS pets (
        id        SERIAL        PRIMARY KEY,
        name      VARCHAR(255)   NOT NULL,
        age       INTEGER       NOT NULL,
        type      VARCHAR(255)   NOT NULL,
        breed     VARCHAR(255)   NOT NULL,
        microchip BOOLEAN       NOT NULL
      );
    `;

    return db
      .query(sql)
      .then((result) => console.log("[DB] Pet table ready."))
      .catch(console.error);
  }

  function mockData() {
    const createPet = `
      INSERT INTO pets
        (name, age, type, breed, microchip)
      VALUES
        ($1, $2, $3, $4, $5)
    `;

    const pets = buildAnimalDatabase();

    pets.forEach((pet) => {
      db.query(createPet, Object.values(pet));
    });
  }

  const init = () => {
    createTable().then(() => {
      console.log("\nCreating mock data for Pets...\n");

      mockData();
    });
  }

  const createOnePet = (pet) => {
    const createPet = `
    INSERT INTO pets (name, age, type, breed, microchip)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
      `;

    return db
      .query(createPet, [pet.name, pet.age, pet.type, pet.breed, pet.microchip])
      .then((result) => result.rows[0])
      .catch(console.error);
  }

  const updatePetById = (pet) => {
    const updatePetByIdSQL = `
    UPDATE pets
    SET name = $2,
    age = $3,
    type = $4,
    breed = $5,
    microchip = $6
    WHERE id = $1
    RETURNING *;
    `
    return db
      .query(updatePetByIdSQL, [pet.id, pet.name, pet.age, pet.type, pet.breed, pet.microchip])
      .then((result) => result[0])
      .catch(console.error);
  }

  const updatePetByName = (pet) => {
    const updatePetByNameSQL = `
    UPDATE pets
    SET age = $2,
    type = $3,
    breed = $4,
    microchip = $5
    WHERE name = $1
    RETURNING *;
    `
    return db
      .query(updatePetByNameSQL, [pet.name, pet.age, pet.type, pet.breed, pet.microchip])
      .then((result) => result.rows[0])
      .catch(console.error);
  }


  const deletePetById = (idOfPet) => {
    const deletePetByIdSQL = `
    DELETE FROM Pets
    WHERE id = $1`

    return db.query(deletePetByIdSQL, [idOfPet])
      .then(result => result.rows[0])
      .catch(console.error)
  }

  const getTypes = (res) => {
    const getTypesSQL = `
    SELECT DISTINCT type FROM Pets
    `
    return db
      .query(getTypesSQL)
      .then((result) => result.rows)
      .catch(console.error);
  }
  const getAllPets = (res) => {
    const getAllSQL = `
    SELECT * FROM Pets
    `
    return db
      .query(getAllSQL)
      .then((result) => result.rows)
      .catch(console.error);
  }


  const getAllByMicrochip = (req, res) => {
    const getAllByMicrochipSQL = `
    SELECT * FROM Pets
    WHERE Microchip = $1
    `
    return db
      .query(getAllByMicrochipSQL, [req.query.microchip])
      .then((result) => result.rows)
      .catch(console.error);
  }

  const getPetsByTypeAndMicrochip = (req, res) => {
    const getPetsByTypeAndMicrochipSQL = `
    SELECT * FROM Pets
    WHERE type = $1 AND microchip = $2
    `
    return db
      .query(getPetsByTypeAndMicrochipSQL, [req.params.type, req.query.microchip])
      .then((result) => result.rows)
      .catch(console.error);
  }


  const getPetsByType = (req, res) => {
    const getPetsByTypeSQL = `
    SELECT * FROM Pets
    WHERE type = $1
    `
    return db
      .query(getPetsByTypeSQL, [req.params.type])
      .then((result) => result.rows)
      .catch(console.error);
  }

  return {
    init,
    createOnePet,
    getTypes,
    getAllPets,
    getAllByMicrochip,
    getPetsByType,
    getPetsByTypeAndMicrochip,
    updatePetById,
    deletePetById,
    updatePetByName

  }
}

module.exports = Pet;


/*curl -X POST -H "Content-Type: application/json" \
-d '{"name": "doggy", "age": 1 , type: "doge", breed: "bobby", microchip: false}' \
 http://localhost:3030/pets 
 
 
 
 id        SERIAL        PRIMARY KEY,
        name      VARCHAR(255)   NOT NULL,
        age       INTEGER       NOT NULL,
        type      VARCHAR(255)   NOT NULL,
        breed     VARCHAR(255)   NOT NULL,
        microchip BOOLEAN       NOT NULL*/

/*  curl -X PUT -H "Content-Type: application/json" -d '{"name":"bob","age":14,"type":"cat","breed":"Turkish Angora","microchip":false}' http://localhost:3030/pets/1 */