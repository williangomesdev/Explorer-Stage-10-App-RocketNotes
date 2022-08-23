//Validação de dados do usuário
const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class SessionsController {
  async create(request, response) {
    //Buscar informações passadas pelo usurário
    const { email, password } = request.body;

    //Buscar usuário no banco de dados
    const user = await knex("users").where({ email }).first();

    //Se usuário não existir informe mensagem de erro
    if (!user) {
      throw new AppError("E-mail e/ou senha incorreta", 401);
    }

    return response.json(user);
  }
}

module.exports = SessionsController;
