const express = require("express");
const fs = require("fs");
const { quickMiddleware } = require("./utils");
const client = require("../db/client");
const { uploadFile } = require("../db/testing");
const testingRouter = express.Router();
const frontEndPath = `../kbReact/public`;

testingRouter.post(
  "/uploads/:fileName",
  quickMiddleware,
  async (req, res, next) => {
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

testingRouter.get("/ipspeaker/:fileName", async (req, res, next) => {
  console.log(req.params);
  res.download(
    "../../Code-related/TechSupportKBReact/public/ipspeaker/ips21_1_6_0105.bin"
  );
});

module.exports = testingRouter;
