const client = require("./client");

async function createImage(data) {
  const { name, file } = data;
  try {
    const {
      rows: [image],
    } = await client.query(
      `
            INSERT INTO images (name, file) VALUES ($1, $2)
            RETURNING *;
        `,
      [name, file]
    );
    return image;
  } catch (error) {}
}

module.exports = {
  createImage,
};
