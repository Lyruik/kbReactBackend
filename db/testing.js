const client = require("./client");

async function uploadFile(fileName) {
  try {
    const response = await client.query(
      `INSERT INTO documents ("docName", "pageCategory") VALUES ($1, $2)
      RETURNING *;`,
      [fileName, "epicDocs"]
    );
    return response.rows;
  } catch (error) {}
}

module.exports = {
  uploadFile,
};
