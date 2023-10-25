const express = require("express");
const { getDocsByPageCategory } = require("../db/documents");
const docRouter = express.Router();

docRouter.get("/", async (req, res, next) => {
  try {
    const response = await getDocsByPageCategory("EPIC-Docs");
    res.send(response);
  } catch (error) {}
});

module.exports = docRouter;
