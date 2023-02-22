require('dotenv').config();

const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
})

app.listen(process.env.PORT, () => {
    console.log('Server is running on port', process.env.PORT);
});

app.get('/', (req, res) => {
    res.json({msg: 'Hello World!'});
});