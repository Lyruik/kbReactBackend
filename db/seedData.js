const { createCategory } = require("./categories");
const client = require("./client");

async function dropTables() {
  console.log("Dropping Tables");
  await client.query(`
        DROP TABLE IF EXISTS equipment;
        DROP TABLE IF EXISTS categories;
    `);
}

async function createTables() {
  try {
    await client.query(`
            CREATE TABLE categories(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE
            );
            CREATE TABLE equipment(
                id SERIAL PRIMARY KEY,
                "equipType" VARCHAR(255) NOT NULL UNIQUE,
                category_id INTEGER REFERENCES categories(id) NOT NULL DEFAULT 5
            );
        `);
    console.log("Successfully created tables");
  } catch (error) {
    console.log({
      message: "Creating tables has failed!",
      error: error,
    });
  }
}

async function createCategories() {
  console.log("Creating Categories");
  try {
    const categoriesToCreate = [
      "Audio",
      "Video",
      "Headend",
      "Other",
      "Unassigned",
    ];
    const categories = await Promise.all(
      categoriesToCreate.map(createCategory)
    );
    console.log("Categories created:", categories);
  } catch (error) {}
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createCategories();
  } catch (error) {}
}

rebuildDB();
