const session = require("../db.config");

module.exports = {
  async index() {
    const getPeople = await session.run(
      "MATCH (p:Person) OPTIONAL MATCH (p)-[:WORKS_IN]->(c:Company) RETURN p, c"
    );

    const formatedPeople = getPeople.records.map((record) => {
      const person = {
        id: record._fields[0].identity.low,
        data: record._fields[0].properties,
      };

      if (record._fields[1] != null) {
        const company = {
          id: record._fields[1].identity.low,
          data: record._fields[1].properties,
        };
        return { person, company };
      }

      return { person, company: { data: { company: "", city: "" } } };
    });

    return formatedPeople;
  },
  async create(params) {
    const personCreated = await session.run(
      "CREATE(p:Person {name:$name, birth:$birth}) return p",
      params
    );

    const { idCompany } = params;

    if (idCompany != null) {
      const newParams = {
        idPerson: personCreated.records[0]._fields[0].identity.low,
        idCompany: idCompany,
      };

      const relationCreated = await session.run(
        "MATCH(p:Person) WHERE id(p)=$idPerson OPTIONAL MATCH(c:Company) WHERE id(c)=$idCompany CREATE(p)-[:WORKS_IN]->(c)",
        newParams
      );

      return relationCreated;
    }

    return personCreated.records[0]._fields[0];
  },
  async update(params) {
    const updatedPerson = await session.run(
      "MATCH(p:Person) WHERE id(p)=$idPerson SET p += { name: COALESCE($name, p.name), birth: COALESCE($birth, p.birth) }",
      params
    );

    const { idCompany } = params;

    if (idCompany != null) {
      const oldIdCompany = await session.run(
        "MATCH (p:Person) WHERE id(p) =$idPerson OPTIONAL MATCH (p)-[:WORKS_IN]->(c:Company) RETURN c",
        params
      );

      const newParams = {
        idPerson: updatedPerson.summary.query.parameters.idPerson,
        idCompany: idCompany,
        oldIdCompany: oldIdCompany.records[0]._fields[0].identity.low,
      };

      await session.run(
        "MATCH (p:Person)-[w:WORKS_IN]->(c:Company) WHERE id(p) =$idPerson AND id(c) =$oldIdCompany DELETE w",
        newParams
      );

      const relationCreated = await session.run(
        "MATCH(p:Person) WHERE id(p)=$idPerson OPTIONAL MATCH(c:Company) WHERE id(c)=$idCompany CREATE(p)-[:WORKS_IN]->(c)",
        newParams
      );

      return relationCreated;
    }

    return updatedPerson.records[0];
  },
  async delete(params) {
    const deletedPerson = await session.run(
      "MATCH(p:Person) WHERE id(p)=$id OPTIONAL MATCH (p)-[w:WORKS_IN]->() DETACH DELETE p, w",
      params
    );

    return deletedPerson;
  },
};
