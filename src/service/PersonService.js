const PersonRepository = require("../repository/PersonRepository");
module.exports = {
  async index() {
    return await PersonRepository.index();
  },
  async create(params) {
    return await PersonRepository.create(params);
  },
  async update(params) {
    const formatedParams = {
      id: Number(params.id),
      name: params.name || null,
      birth: params.birth || null,
    };

    return await PersonRepository.update(formatedParams);
  },
  async delete(params) {
    const formatedParams = { id: Number(params) };

    return await PersonRepository.delete(formatedParams);
  },
};
