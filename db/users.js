const client = require("./client");
const bcrypt = require("bcrypt");

async function createRole(obj) {
  try {
    // making quick roles will expand later I'm sure
    // I'd like to make the permissions it's own object/json
    const { rows: roles } = await client.query(
      `
            INSERT INTO roles (role_name, permissions) VALUES ($1, $2)
            RETURNING role_name;
        `,
      Object.values(obj)
    );
    return roles;
  } catch (error) {}
}

async function createUser(obj) {
  try {
    console.log("frick");
    // we should add a check here later to make sure there are no conflicting usernames
    // to start we'll just insert into users
    await bcrypt.hash(obj.password, 10).then((hash) => (obj.password = hash));
    console.log(Object.values(obj));
    const createduser = await client.query(
      `
        INSERT INTO users (username, password) VALUES ($1, $2)
        RETURNING id, username;
    `,
      Object.values(obj)
    );
    console.log(createduser.rows);
    return createduser.rows[0];
  } catch (error) {}
}

module.exports = {
  createUser,
  createRole,
};
