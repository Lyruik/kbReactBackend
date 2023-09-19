const client = require("./client");

async function createCategory(name) {
  try {
    const {
      rows: [createdCategory],
    } = await client.query(
      `INSERT INTO categories (name) VALUES ($1)
       RETURNING *;
        `,
      [name]
    );
    return createdCategory;
  } catch (error) {}
}

async function getCategoryIdByName(name) {
  try {
    const {
      rows: [categoryId],
    } = await client.query(
      `
      SELECT id FROM categories WHERE name = $1
    `,
      [name]
    );
    return categoryId;
  } catch (error) {}
}

module.exports = {
  createCategory,
  getCategoryIdByName,
};
