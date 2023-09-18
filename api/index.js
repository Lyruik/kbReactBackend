const express = require("express");
const apiRouter = express.Router();

const equipmentRouter = require("./equipment");
apiRouter.use("/equipment", equipmentRouter);

apiRouter.use((req, res, next) => {
  res.status(404).send({ message: "Sorry can't find that" });
});

module.exports = apiRouter;
