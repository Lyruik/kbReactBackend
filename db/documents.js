const client = require("./client");

async function createDocument(fields) {
  let arr = [];
  const setString = Object.keys(fields)
    .map((key, index) => {
      arr.push(`$${index + 1}`);
      return `"${key}"`;
    })
    .join(", ");
  try {
    const {
      rows: [docItem],
    } = await client.query(
      `INSERT INTO documents(${setString}) VALUES (${arr})
      RETURNING *;`,
      Object.values(fields)
    );
    return docItem;
  } catch (error) {}
}

async function getRelevantDocsByDeviceName(deviceName) {
  try {
    const { rows: docs } = await client.query(
      `
      SELECT "docName" FROM documents d JOIN equipment e ON d.id = ANY(e."relatedDocIds") WHERE e."equipType" = $1;
        `,
      [deviceName]
    );
    return docs;
  } catch (error) {}
}

async function getDocsByPageCategory(str) {
  try {
    const { rows: docs } = await client.query(
      `SELECT * FROM documents WHERE "pageCategory" = $1;`,
      [str]
    );
    return docs;
  } catch (error) {}
}

module.exports = {
  createDocument,
  getRelevantDocsByDeviceName,
  getDocsByPageCategory,
};
