const express = require("express");
const { route } = require("express/lib/application");
const { getAll, createOne, getAllTypes, edit, deleteById } = require("./controller");
const router = express.Router();

router.post("/", createOne);
router.get("/", getAll);
router.get("/:type", getAllTypes);
router.put("/:identifier", edit);
router.delete("/:id", deleteById);

module.exports = router;

