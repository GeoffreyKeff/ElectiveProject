"use strict";
//Variable mongoose pour utuliser le module mongoose
// @ts-ignore
const mongoose = require('mongoose');
//URL de la bdd
const url_mongo = process.env.DB_Host;
mongoose.set('strictQuery', true);
//Connexion à la bdd
mongoose.connect(url_mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
//Message de connexion
db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
db.once('open', function () {
    console.log("Connexion à la base OK");
});
