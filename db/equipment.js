const client = require("./client");

async function createEquipmentItem(fields) {
  /* we should put a check here that disqualifies entries 
  that include an apostrophe, it breaks the value input */

  const colArr = [];
  const valArr = [];
  Object.keys(fields).map((key) => {
    colArr.push(`"${key}"`);
  });
  Object.values(fields).map((val) => {
    valArr.push(`'${val}'`);
  });
  const columns = colArr.join(", ");
  const values = valArr.join(", ");
  try {
    const {
      rows: [equipItem],
    } = await client.query(
      `INSERT INTO equipment(${columns}) VALUES(${values})
        RETURNING *;`
    );
    return equipItem;
  } catch (error) {}
}

async function getEquipmentItemsByCategory(categoryId) {
  if (!categoryId) {
    categoryId = 8;
  }
  try {
    const { rows } = await client.query(
      `
      SELECT * FROM equipment e JOIN images i ON e."imageId"=i.id WHERE "categoryId" = $1;
    `,
      [categoryId]
    );
    return rows;
  } catch (error) {}
}

module.exports = {
  createEquipmentItem,
  getEquipmentItemsByCategory,
};
