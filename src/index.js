const express = require("express");
require("express-async-errors");
const routes = require("./routes");
const err = require("./middleware/err-middleware");
const cors = require('./middleware/cors-middleware');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors);
app.use(routes);
app.use(err);


app.listen(3001,()=>console.log("Servidor Iniciado!"));
