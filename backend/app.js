const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("cookie-session");

//gestion des variables d'environnement
const dotenv = require("dotenv").config();

//sécurisation des entêtes HTTP
const helmet = require("helmet");
app.use(helmet());

// gestion des chemins de fichiers
const path = require("path");

const userRoutes = require("./routes/user");

//URL de notre base
var urlmongo =
  "mongodb+srv://OCTEST:dbpassword159@octest.bkafp.mongodb.net/piquante?retryWrites=true&w=majority";

//connexion à MongoDB
mongoose
  .connect(urlmongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Politique de sécurité pour le partage de ressources(cors)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// chemin middleware utilisateurs
app.use("/api/auth", userRoutes);

module.exports = app;
