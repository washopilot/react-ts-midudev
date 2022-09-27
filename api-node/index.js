const express = require('express');
const cors = require('cors');
const apiResponse = require('./apiResponse.json');
const app = express();

app.use(cors());

app.listen(3000, () => {
    console.log('El servidor está inicializado en el puerto 3000');
});

app.get('/subs', function (req, res) {
    res.send(apiResponse);
});
