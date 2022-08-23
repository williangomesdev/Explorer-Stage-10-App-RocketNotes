//Validação de dados do usuário
const knex = require("../database/knex");
const AppError = require("../utils/AppError");

//Validando senha criptografada
const { compare } = require("bcryptjs");

class SessionsController {
  async create(request, response) {
    //Buscar informações passadas pelo usurário
    const { email, password } = request.body;

    //Buscar usuário no banco de dados
    const user = await knex("users").where({ email }).first();

    //Se usuário não existir no banco de dados informe mensagem de erro
    if (!user) {
      throw new AppError("E-mail e/ou senha incorreta", 401);
    }

  //Comparar senha enviada com a senha do banco
    const passwordMatched = await compare(password, user.password);

    //Se a senha for diferente da senha cadastrada no banco de dados informe mensagem de erro
    if(!passwordMatched){
      throw new AppError("E-mail e/ou senha incorreta", 401);
    } 
    return response.json(user);
  }
}

module.exports = SessionsController;
