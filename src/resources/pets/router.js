const express = require("express");
const { getAll, createOne, getAllTypes } = require("./controller");
const router = express.Router();

router.post("/", createOne);
router.get("/", getAll);
router.get("/:type", getAllTypes);

module.exports = router;

