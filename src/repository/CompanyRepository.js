const session = require("../db.config");

module.exports = {
  async index() {
    const getCompanies = await session.run("MATCH(c:Company) return c");

    return getCompanies.records.map((record) => {
      return {
        id: record._fields[0].identity.low,
        data: record._fields[0].properties,
      };
    });
  },

  async create(params) {
    const companyCreated = await session.run(
      "CREATE(c:Company {company:$company,city:$city}) return c",
      params
    );

    return companyCreated.records[0]._fields[0].properties;
  },

  async update(params) {
    const updatedCompany = await session.run(
      "MATCH(c:Company) WHERE id(c)=$id SET c += {company: COALESCE($company, c.company), city: COALESCE($city, c.city)}",
      params
    );

    return updatedCompany.records[0];
  },

  async delete(params) {
    const deletedCompany = await session.run(
      "MATCH(c:Company) WHERE id(c)=$id DETACH DELETE c",
      params
    );

    return deletedCompany;
  },
};
