const CompanyService = require("../service/CompanyService");

module.exports = {
  async index(req, res) {
    try {
      const getCompanies = await CompanyService.index();

      res.status(200).send(getCompanies);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },

  async create(req, res) {
    try {
      const company = req.body;
      console.log(company);
      const createdCompany = await CompanyService.create(company);

      res.status(201).send(createdCompany);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },

  async update(req, res) {
    try {
      const company = req.body;
      const { id } = req.params;
      const companyData = {
        id,
        ...company,
      };
      const updatedCompany = await CompanyService.update(companyData);

      res.status(200).send(updatedCompany);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedCompany = await CompanyService.delete(id);

      res.status(200).send();
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
};
