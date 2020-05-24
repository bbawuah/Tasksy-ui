const express = require("express");
const app = express();
const path = require("path");
const dotenv = require('dotenv');

dotenv.config()

const publicPath = path.join(__dirname, 'public')
console.log(process.env.PORT)
const port = process.env.PORT || 8080;

app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(port, () => {
    console.log('Server is up');
})