const { createCategory } = require("./categories");
const client = require("./client");
const { createDocument } = require("./documents");
const { createEquipmentItem } = require("./equipment");
const { createImage } = require("./images");
const {
  ms500Docs,
  docsToCreate,
} = require("./largeSeedImports/documentsImport");
const { equipmentToCreate } = require("./largeSeedImports/equipmentImport");
const { imagesToCreate } = require("./largeSeedImports/imageImport");

async function dropTables() {
  console.log("Dropping Tables");
  await client.query(`
        DROP TABLE IF EXISTS equipment;
        DROP TABLE IF EXISTS documents;
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
            CREATE TABLE documents(
              id SERIAL PRIMARY KEY,
              "docName" TEXT NOT NULL,
              "pageCategory" VARCHAR(255) DEFAULT 'Unassigned'
            );
            CREATE TABLE equipment(
                id SERIAL PRIMARY KEY,
                "equipType" VARCHAR(255) NOT NULL UNIQUE,
                "imageId" INTEGER REFERENCES images(id) NOT NULL DEFAULT 1,
                "categoryId" INTEGER REFERENCES categories(id) NOT NULL DEFAULT 8,
                "relatedDocIds" INTEGER[]
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
      "70V-Amplifiers",
      "CA-Devices",
      "Retired-Amps",
    ];
    const categories = await Promise.all(
      categoriesToCreate.map(createCategory)
    );
    //console.log("Categories created:", categories);
  } catch (error) {}
}

async function createInitImages() {
  console.log("Created Images");
  try {
    const imagesList = await Promise.all(imagesToCreate.map(createImage));
    //console.log("Created images:", imagesList);
  } catch (error) {}
}

async function createInitDocuments() {
  console.log("Create initial Documents");
  try {
    const docList = await Promise.all(docsToCreate.map(createDocument));
    //console.log("Created documents:", docList);
  } catch (error) {}
}

async function createInitEquipment() {
  console.log("Creating initial equipment list");
  try {
    const equipmentList = await Promise.all(
      equipmentToCreate.map(createEquipmentItem)
    );
    //console.log("Created equipment:", equipmentList);
  } catch (error) {}
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createCategories();
    await createInitImages();
    await createInitDocuments();
    await createInitEquipment();
    console.log("We've reached the end probably");
  } catch (error) {}
}

rebuildDB();
