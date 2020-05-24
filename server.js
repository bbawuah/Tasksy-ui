const express = require("express");
const app = express();
const path = require("path");
const proxy = require('http-proxy-middleware')

const publicPath = path.join(__dirname, 'public')

const port = process.env.PORT || 8080;

app.use(express.static(publicPath));

const apiProxyTarget = process.env.API_PROXY_TARGET;
app.use(proxy({target: apiProxyTarget, changeOrigin: true}));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(port, () => {
    console.log('Server is up');
})