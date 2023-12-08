const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5500;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
app.use(express.json());
app.use(cors());

// Handle MongoDB connection events
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));
db.once('open', () => {
    console.log('Connected to MongoDB database');
});

// Define the City model
const City = mongoose.model('Cidades', {
    "municipio-id": Number,
    "municipio-nome": String,
    "microrregiao-id": Number,
    "microrregiao-nome": String,
    "mesorregiao-id": Number,
    "mesorregiao-nome": String,
    "regiao-imediata-id": Number,
    "regiao-imediata-nome": String,
    "regiao-intermediaria-id": Number,
    "regiao-intermediaria-nome": String,
    "UF-id": Number,
    "UF-sigla": String,
    "UF-nome": String,
    "regiao-id": Number,
    "regiao-sigla": String,
    "regiao-nome": String
});

// Route to get all cities
app.get('/consulta', async (req, res) => {
    try {
        const cidades = await City.find();
        console.log(cidades);
        res.json(cidades);

    } catch (error) {
        res.status(500).json({ error: 'Error retrieving cities' });
    }
});

// Route to get cities by state
app.get('/consulta/estado/:estado', async (req, res) => {
    try {
        const estado = req.params.estado;
        const cidades = await City.find({ "UF-nome": estado }).select('municipio-nome');
        console.log(cidades);
        res.json(cidades);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving cities' });
    }
});

// Route to get city details
app.get('/consulta/cidade/:cidade', async (req, res) => {
    try {
        const cidade = req.params.cidade;
        const cidades = await City.find({ "municipio-nome": cidade }).select({
            "municipio-nome": 1,
            "mesorregiao-nome": 1,
            "UF-nome": 1,
            "UF-sigla": 1,
            "regiao-nome": 1,
            _id: 0
        });
        console.log(cidades);
        res.json(cidades);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving cities' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});