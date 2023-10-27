const express = require("express");
const { getDocsByPageCategory } = require("../db/documents");
const docRouter = express.Router();

docRouter.get("/:category", async (req, res, next) => {
  try {
    const response = await getDocsByPageCategory(req.params.category);
    res.send(response);
  } catch (error) {}
});

module.exports = docRouter;
