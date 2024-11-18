// controllers/bookController.js
const Books = require("../models/books");

// Obtener todos los libros
const getAll = async (req, res) => {
  try {
    const books = await Books.find({});
    if (!books) {
      return res.send("No hay ningun libro disponible");
    } else {
      return res.send(books);
    }
  } catch (error) {
    return res.send(error);
  }
};

// Obtener un libro por ID
const getById = async (req, res) => {
  try {
    const book = await Books.findById(req.params.id);
    if (!book) {
      return res.send("No hay ningun libro disponibl");
    } else {
      return res.send(book);
    }
  } catch (error) {
    return res.send(error);
  }
};

// Actualizar un libro
const update = async (req, res) => {
  try {
    const book = await Books.findById(req.params.id);
    if (!book) {
      return res.send({ message: "No hay libros disponibles con ese ID" });
    } else {
      await Books.updateOne({ _id: req.params.id }, req.body);
      res.send({ message: "Actualizado Exitosamente" });
    }
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

// Crear un nuevo libro
const create = async (req, res) => {
  try {
    const newBook = await Books.create(req.body);
    if (newBook) {
      return res.status(201).send({ message: "Nuevo Libro Guardado exitosamente" });
    } else {
      return res.status(400).send({ message: "Error al crear un nuevo libro" });
    }
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

// Eliminar un libro
const remove = async (req, res) => {
  try {
    const book = await Books.findById(req.params.id);
    if (book) {
      await Books.deleteOne(book);
      return res.send({ message: "Libro Eliminado Exitosamente" });
    } else {
      return res.send({ message: "No hay libros disponibles con ese ID" });
    }
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

module.exports = {
  getAll,
  create,
  getById,
  update,
  remove,
};