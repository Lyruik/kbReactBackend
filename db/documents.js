const client = require("./client");

async function createDocument(doc) {
  try {
    const response = await client.query(
      `
            INSERT INTO documents("docName") VALUES($1)
            RETURNING *;
        `,
      [doc.docName]
    );
    return response.rows;
  } catch (error) {}
}

module.exports = {
  createDocument,
};
