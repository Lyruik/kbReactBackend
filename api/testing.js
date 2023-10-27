const express = require("express");
const fs = require("fs");
const testingRouter = express.Router();
const randomStr = "lkdsjfljhjlthoh88uu432490F#@(!!jj";

const quickMiddleware = (req, res, next) => {
  if (localStorage.getItem("fakeToken") === randomStr) {
    next();
  } else {
    res.send("u r faker");
  }
};

testingRouter.post(
  "/uploads/:fileName",
  quickMiddleware,
  async (req, res, next) => {
    req.on("data", async (chunk) => {
      fs.appendFileSync(`${req.params.fileName}`, chunk);
    });
    return res.end("paba");
  }
);

module.exports = testingRouter;
