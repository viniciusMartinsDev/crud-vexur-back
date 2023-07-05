const PersonRepository = require("../repository/PersonRepository");
module.exports = {
  async index() {
    return await PersonRepository.index();
  },
  async create(params) {
    const formatedParams = {
      idCompany: Number(params.idCompany) || null,
      name: params.name,
      birth: params.birth,
    };
    return await PersonRepository.create(formatedParams);
  },
  async update(params) {
    const formatedParams = {
      idPerson: Number(params.idPerson),
      name: params.name || null,
      birth: params.birth || null,
      idCompany: Number(params.idCompany) || null,
    };

    return await PersonRepository.update(formatedParams);
  },
  async delete(params) {
    const formatedParams = { id: Number(params) };

    return await PersonRepository.delete(formatedParams);
  },
};
