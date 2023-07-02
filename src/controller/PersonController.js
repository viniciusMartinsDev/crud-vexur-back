const PerosnService = require("../service/PersonService");

module.exports = {
  async index(req, res) {
    try {
      const getPeople = await PerosnService.index();
      res.status(200).send(getPeople);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },

  // async show(req, res) {
  //   try {
  //   } catch (error) {}
  // },

  async create(req, res) {
    try {
      const person = req.body;
      const createdPerson = await PerosnService.create(person);

      res.status(200).send(createdPerson);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },

  async update(req, res) {
    try {
      const person = req.body;
      const { id } = req.params;
      const personData = {
        id,
        ...person,
      };
      const updatedPerson = await PerosnService.update(personData);

      res.status(200).send(updatedPerson);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedPerson = await PerosnService.delete(id);

      res.status(200).send(deletedPerson);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
};
