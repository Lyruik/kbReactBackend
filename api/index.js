const express = require("express");
const apiRouter = express.Router();

const somethingRouter = require("/something");
apiRouter.use("/something", somethingRouter);

module.exports = apiRouter;
