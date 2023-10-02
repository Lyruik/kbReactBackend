const client = require("./client");

async function createDocument(name) {
  try {
    const response = await client.query(
      `
            INSERT INTO documents("docName") VALUES($1)
            RETURNING *;
        `,
      [name]
    );
    return response.rows;
  } catch (error) {}
}

module.exports = {
  createDocument,
};
