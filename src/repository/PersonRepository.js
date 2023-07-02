const session = require("../db.config");

module.exports = {
  async index() {
    const getPeople = await session.run("MATCH(p:Person) return p");

    return getPeople.records.map((record) => {
      return {
        id: record._fields[0].identity.low,
        data: record._fields[0].properties,
      };
    });
  },
  async create(params) {
    const personcreated = await session.run(
      "CREATE(p:Person {name:$name, birth:$birth}) return p",
      params
    );

    return personcreated.records[0]._fields[0].properties;
  },
  async update(params) {
    const updatedPerson = await session.run(
      "MATCH(p:Person) WHERE id(p)=$id SET p += { name: COALESCE($name, p.name), birth: COALESCE($birth, p.birth) }",
      params
    );

    return updatedPerson.records[0];
  },
  async delete(params) {
    const deletedPerson = await session.run(
      "MATCH(p:Person) WHERE id(p)=$id DETACH DELETE p",
      params
    );

    return deletedPerson;
  },
};
