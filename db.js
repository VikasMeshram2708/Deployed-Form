const monk = require("monk");
const db = monk(process.env.MONGO_URI);

if (db) {
  console.log(`Connected to DB Successfully`);
} else {
  console.log(`Connection with DB Failes`);
}

module.exports = db;
