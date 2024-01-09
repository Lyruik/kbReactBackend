const express = require("express");
const loginRouter = express.Router();

loginRouter.post("/", async (req, res, next) => {
  return true;
});

module.exports = loginRouter;
