const client = require("./client");

async function createCategory(name) {
  console.log("hi");
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

module.exports = {
  createCategory,
};
