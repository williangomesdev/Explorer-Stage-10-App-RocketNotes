const { Router } = require("express");

//importar do controllers
const UsersController = require("../controllers/UsersController");

//importar middleware
const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const usersRoutes = Router();

//instanciando na memória
const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/",ensureAuthenticated, usersController.update);

//exportar rotas para o server.js
module.exports = usersRoutes;
