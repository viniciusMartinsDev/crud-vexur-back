const CompanyRepository = require("../repository/CompanyRepository");

module.exports = {
  async index() {
    return await CompanyRepository.index();
  },

  async create(params) {
    return await CompanyRepository.create(params);
  },

  async update(params) {
    const formatedParams = {
      id: Number(params.id),
      company: params.company || null,
      city: params.city || null,
    };

    return await CompanyRepository.update(formatedParams);
  },

  async delete(params) {
    const formatedParams = { id: Number(params) };

    return await CompanyRepository.delete(formatedParams);
  },
};
