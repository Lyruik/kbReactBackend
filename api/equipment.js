const express = require("express");

const { getEquipmentItemsByCategory } = require("../db/equipment");
const { getCategoryIdByName } = require("../db/categories");
const { getRelevantDocsByDeviceName } = require("../db/documents");
const equipmentRouter = express.Router();

equipmentRouter.get("/", async (req, res, next) => {
  try {
    const response = await getEquipmentItemsByCategory();
    res.send(response);
  } catch (error) {}
});

equipmentRouter.get("/:subCategory", async (req, res, next) => {
  try {
    const categoryId = await getCategoryIdByName(req.params.subCategory);
    categoryId
      ? res.send(await getEquipmentItemsByCategory(categoryId.id))
      : res.send(await getRelevantDocsByDeviceName(req.params.subCategory));
  } catch (error) {}
});

module.exports = equipmentRouter;
