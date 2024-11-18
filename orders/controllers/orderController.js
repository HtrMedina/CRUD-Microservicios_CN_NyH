const Order = require('../models/orders');
const axios = require('axios'); // Para manejar las solicitudes http/https

// Controlador para crear una nueva orden
const create = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    if (newOrder) {
      return res.status(201).send({ message: "Orden creada Exitosamente" });
    } else {
      return res.status(400).send({ message: "Error al crear la orden" });
    }
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

// Controlador para obtener todas las órdenes
const getAll = async (req, res) => {
  try {
    const orders = await Order.find({});
    if (!orders) {
      return res.send("No se encuentran ordenes activas");
    } else {
      return res.send(orders);
    }
  } catch (error) {
    return res.send(error);
  }
};

// Controlador para obtener una orden por su id
const getById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.send("Orden no encontrada");
    } else {
      const bookResponse = await axios.get(`http://localhost:8000/books/get/${order.BookId}`);
      const customerResponse = await axios.get(`http://localhost:8001/customer/get/${order.CustomerId}`);

      const book = bookResponse.data.title; 
      const customer = customerResponse.data.name;

      return res.send({
        "_id": order.id,
        "CustomerName": customer,
        "BookTitle": book,
        "initialDate": order.initialDate,
        "deliveryDate": order.deliveryDate
      });
    }
  } catch (error) {
    return res.send(error);
  }
};

module.exports = {
  create,
  getAll,
  getById
};