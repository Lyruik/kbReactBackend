const express = require("express");
const fs = require("fs");
const { quickMiddleware } = require("./utils");
const client = require("../db/client");
const { uploadFile } = require("../db/testing");
const testingRouter = express.Router();
const frontEndPath = `../TechSupportKBReact/public`;

testingRouter.post(
  "/uploads/:fileName",
  quickMiddleware,
  async (req, res, next) => {
    console.log("ooga");
    req.on("data", (chunk) => {
      fs.appendFileSync(
        `${frontEndPath}/docs/epicDocs/${req.params.fileName}`,
        chunk
      );
    });
    return res.end("dis chunk done");
  }
);

testingRouter.post(
  "/uploads/databaseFile/:fileName",
  quickMiddleware,
  async (req, res, next) => {
    const response = await uploadFile(req.params.fileName);
    res.send(response);
  }
);

module.exports = testingRouter;
