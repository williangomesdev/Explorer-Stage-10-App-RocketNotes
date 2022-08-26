require("express-async-errors");
const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");
const uploadConfig = require("./configs/upload");

const express = require("express");

//Importar rotas
const routes = require("./routes");

//chamar banco de dados/criar novo
migrationsRun();

const app = express();
//Informar qual o formato que o servidor enviará os dados
app.use(express.json());

//Servindo imagens
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

//Adicionando as rotas
app.use(routes);

//tratamento de erro
app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
