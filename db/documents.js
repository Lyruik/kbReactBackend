const client = require("./client");

async function createDocument(fields) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  console.log(
    `INSERT INTO documents(${setString})
       RETURNING *;`,
    Object.values(fields)
  );
  try {
    const {
      rows: [docItem],
    } = await client.query(Object.values(fields));
    console.log("AHHHHHHHHHHHHHHHHHHHHHHHHHH");
    return docItem;
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
