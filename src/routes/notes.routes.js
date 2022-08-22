const { Router } = require("express");

//importar do controllers
const NotesController = require("../controllers/NotesController");

const notesRoutes = Router();

//instanciando na memória
const notesController = new NotesController();

notesRoutes.get("/", notesController.index);
notesRoutes.post("/:user_id", notesController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete);

//exportar rotas para o server.js
module.exports = notesRoutes;
