const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  process.env.DB_HOST,
  neo4j.auth.basic(process.env.DB_USER, process.env.DB_PASSWORD)
);

module.exports = driver.session();
