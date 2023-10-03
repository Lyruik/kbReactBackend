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

/* 
putting this here for when I want to request documents from SQL, might go to a separate documents.js file or something

select (select array_agg("docName") "docNames" from documents d join equipment e on d.id = ANY(e."relatedDocIds") where e."equipType" = 'MS-500'), * from equipment where "equipType" = 'MS-500';

can't go forgetting the syntax on that one
*/

module.exports = equipmentRouter;
