const client = require("./client");

async function createEquipmentItem(item) {
  const { equipType, categoryId } = item;
  try {
    const {
      rows: [equipmentItem],
    } = await client.query(
      `INSERT INTO equipment("equipType", category_id) VALUES($1, $2)
        RETURNING *;
        `,
      [equipType, categoryId]
    );
    return equipmentItem;
  } catch (error) {}
}

module.exports = {
  createEquipmentItem,
};
