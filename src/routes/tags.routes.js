const { Router } = require("express");

//importar do controllers
const TagsController = require("../controllers/TagsController");

const tagsRoutes = Router();

//instanciando na memória
const tagsController = new TagsController();

tagsRoutes.get("/:user_id", tagsController.index);

//exportar rotas para o server.js
module.exports = tagsRoutes;
