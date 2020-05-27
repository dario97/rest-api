const express = require("express");
const app = express();
const router = require("../routes/index.js");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
});
