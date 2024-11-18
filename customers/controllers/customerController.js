//Requiere el modelo de Clientes
const Customer = require('../models/customer');

//Crea un nuevo cliente
const create = async (req, res) => {
    try {
      const newCustomer = await Customer.create(req.body);
      if (newCustomer) {
        return res.status(201).send({ message: "Nuevo cliente creado exitosamente" });
      } else {
        return res.status(400).send({ message: "Error al crear nuevo cliente" });
      }
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  };

//Obtiene todos los clientes
  const getAll = async (req, res) => {
    try {
      const customers = await Customer.find({});
      if (!customers) {
        return res.send("No se encuentran clientes");
      } else {
        return res.send(customers);
      }
    } catch (error) {
      return res.send(error);
    }
  };

//Obtiene un clinete por el id
  const getById = async (req, res) => {
    try {
      const customers = await Customer.findById(req.params.id);
      if (!customers) {
        return res.send("No se encuentran clientes");
      } else {
        return res.send(customers);
      }
    } catch (error) {
      return res.send(error);
    }
  };

//Actualiza un cliente
  const update = async (req, res) => {
    try {
      const customer = await Customer.findById(req.params.id);
      if (!customer) {
        return res.send({ message: "No se encuentran clientes con ese id" });
      } else {
        await Customer.updateOne({ _id: req.params.id },req.body);
        res.send({ message: "Actualizado exitosamente" });
      }
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  };

//Elimina un cliente
  const remove = async (req, res) => {
    try {
      const customer = await Customer.findById(req.params.id);
      if (customer) {
        await Customer.deleteOne(customer);
        return res.send({ message: "Eliminado exitosamente" });
      } else {
        return res.send({ message: "No se encuentran clientes con ese id" });
      }
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  };

  module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
  }
  