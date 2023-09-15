const { createCategory } = require("./categories");
const client = require("./client");
const { createEquipmentItem } = require("./equipment");

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

async function createInitEquipment() {
  console.log("Creating initial equipment list");
  try {
    const equipmentToCreate = [
      {
        equipType: "Amplifiers",
        categoryId: 1,
      },
      {
        equipType: "Cameras",
        categoryId: 2,
      },
      {
        equipType: "EPIC-Headend",
        categoryId: 3,
      },
      {
        equipType: "Microphones",
        categoryId: 1,
      },
      {
        equipType: "Strobes",
        categoryId: 4,
      },
      {
        equipType: "Wallplates",
        categoryId: 4,
      },
      {
        equipType: "Speakers",
        categoryId: 1,
      },
    ];
    const equipmentList = await Promise.all(
      equipmentToCreate.map(createEquipmentItem)
    );
    console.log("Created equipment:", equipmentList);
  } catch (error) {}
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createCategories();
    await createInitEquipment();
  } catch (error) {}
}

rebuildDB();
