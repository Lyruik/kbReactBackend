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

async function getRelevantDocsByDeviceName(deviceName) {
  try {
    const { rows: docs } = await client.query(
      `
        SELECT (SELECT ARRAY_AGG("docName") "docs" FROM documents d JOIN equipment e ON d.id = ANY(e."relatedDocIds") WHERE e."equipType" = $1) FROM equipment WHERE "equipType" = $1;
        `,
      [deviceName]
    );
    console.log(docs[0].docs);
    const owo = [];
    for (let key of docs[0].docs) {
      owo.push(JSON.parse(key));
    }
    return owo;
  } catch (error) {}
}

module.exports = {
  createDocument,
  getRelevantDocsByDeviceName,
};
