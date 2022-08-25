const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

//importar do controllers
const UsersController = require("../controllers/UsersController");

//importar middleware
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

//instanciando na memória
const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
//patch atualizar um campo especifico
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  (request, response) => {
    console.log(request.file.filename);
    response.json();
  }
);

//exportar rotas para o server.js
module.exports = usersRoutes;
