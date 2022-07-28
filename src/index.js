const express = require("express");
require("express-async-errors");
const routes = require("./routes");
const ErrMiddleware = require("./middleware/ErrMiddleware");

const app = express();
app.use(express.json());
app.use(routes);
app.use(ErrMiddleware);


app.listen(3001,()=>console.log("Servidor Iniciado!"));
