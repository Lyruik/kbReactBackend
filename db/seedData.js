const { createCategory } = require("./categories");
const client = require("./client");
const { createEquipmentItem } = require("./equipment");
const { createImage } = require("./images");
const { equipmentToCreate } = require("./largeSeedImports/equipmentImport");
const { imagesToCreate } = require("./largeSeedImports/imageImport");

async function dropTables() {
  console.log("Dropping Tables");
  await client.query(`
        DROP TABLE IF EXISTS equipment;
        DROP TABLE IF EXISTS images;
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
            CREATE TABLE images(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL,
                file TEXT NOT NULL
            );
            CREATE TABLE equipment(
                id SERIAL PRIMARY KEY,
                "equipType" VARCHAR(255) NOT NULL UNIQUE,
                "imageId" INTEGER REFERENCES images(id) NOT NULL DEFAULT 1,
                "categoryId" INTEGER REFERENCES categories(id) NOT NULL DEFAULT 8
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
      "Amplifiers",
      "Cameras",
      "EPIC-Headend",
      "Microphones",
      "Strobes",
      "Wallplates",
      "Speakers",
      "Unassigned",
      "MS-Devices",
    ];
    const categories = await Promise.all(
      categoriesToCreate.map(createCategory)
    );
    console.log("Categories created:", categories);
  } catch (error) {}
}

async function createInitImages() {
  console.log("Created Images");
  try {
    const imagesList = await Promise.all(imagesToCreate.map(createImage));
    console.log("Created images:", imagesList);
  } catch (error) {}
}

async function createInitEquipment() {
  console.log("Creating initial equipment list");
  try {
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
    await createInitImages();
    await createInitEquipment();
  } catch (error) {}
}

rebuildDB();
