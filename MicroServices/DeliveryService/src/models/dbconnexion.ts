// @ts-ignore
const mongoose = require('mongoose');

//URL de la bdd
mongoose.set('strictQuery', true);

//Connexion à la bdd
mongoose.connect("mongodb://172.16.44.14/Delivery", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// @ts-ignore
const db = mongoose.connection;

//Message de connexion
db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
db.once('open', function (){
    console.log("Connexion à la base OK");
});

