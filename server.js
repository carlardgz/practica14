//no abusar de la longitud del query
//no pasar datos sensibles a través del query
//q es la variable con el contenido

const express = require("express"); //importamos dependencia
let app = express(); //declaramos una App de Express
let port = process.env.port || 3000; //definición del puerto que escucha

app.use("/assets", express.static(__dirname + "/public"));
/*Esta línea le especifica a la aplicación de express que el directorio virtual
para el contenido estático se llama “/assets” y que ese nombre será mapeado a una 
carpeta física “/public”, que se encuentra en el directorio donde corre 
la aplicación “__dirname” */

app.set("view engine", "ejs"); //setteamos el ejs

app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html> <html lang="en"> <head><link rel="stylesheet" href="assets/style.css"/>
  <title> Document </title> </head>
  <body> <h1> Hola mundo </h1>
  <p>Este es un parrafo y su contenido debe ser azul</p></body> </html>`);
}); // pequeña estructura html con un encabezado, cuerpo y párrafo.

app.get("/person/:id", (req, res) => {
  res.render("person", { ID: req.params.id, Qstr: req.query.qrst });
}); //a la key ID le pasamos el valor de la ruta "/person/:id" y el valor del
//query string (qrst) es parseado por express y lo pone a nuestra disposición
//mediante req.query seguido del nombre del valor que se usará en el query
//string cuando se haga la petición http.

app.get("/message/:id", (req, res) => {
  res.render("message", {
    ID: req.params.id,
    message: req.query.message,
    times: req.query.times,
  });
});

app.listen(port);

/*


app.use("/", function (req, res, next) {
  console.log("Request URL:" + req.url);
  next();
});


//primera ruta (está al nivel de la raíz /), Hello World!
app.get("/", function(req, res) {
    res.render("index");
});

//segunda ruta /api, regresa un objeto JSON
app.get("/api", function(req, res) {
    res.json({ firstname: "Carla", lastname: "Rodríguez" });
});

//tercera ruta, enviamos un parámetro a nuestro server utilizando la barra de
//direcciones del navegador
app.get("/person/:id", function(req, res) {
    res.render("person", { ID: req.params.id });
});
*/
