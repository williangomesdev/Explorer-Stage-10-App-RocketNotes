//Middleware para interceptar o token e descobrir o usuário que estar fazendo a requisição
const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next) {
  //Buscar o token do usuario
  const authHeader = request.header.authorization;

  //Se o token não existir
  if (!authHeader) {
    throw new AppError("JWT Token não informado", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret);

    request.user = {
      id: Number(user_id),
    };

    return next();
  } catch {
    throw new AppError("JWT Token Inválido", 401);
  }
}

module.exports = ensureAuthenticated;
