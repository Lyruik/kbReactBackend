const express = require("express");
const fs = require("fs");
const { quickMiddleware } = require("./utils");
const client = require("../db/client");
const { uploadFile } = require("../db/testing");
const testingRouter = express.Router();
<<<<<<< HEAD
=======
// this frontEndPath might need to change on other systems too? strangely it was working previously but I am pretty sure I've renamed directories on all platforms
>>>>>>> 714c8d92ecba818ff91de53ed160ca62a48489d2
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
