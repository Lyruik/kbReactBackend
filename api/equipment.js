const express = require("express");

const { getEquipmentItemsByCategory } = require("../db/equipment");
const { getCategoryIdByName } = require("../db/categories");
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
    if (categoryId) {
      const response = await getEquipmentItemsByCategory(categoryId.id);
      res.send(response);
    }
  } catch (error) {}
});

module.exports = equipmentRouter;
