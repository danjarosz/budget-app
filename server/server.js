const express = require('express');
const path = require('path');
const app = express();
const publicPath = path.join(__dirname, '..', 'build');
const port = process.env.PORT || 9000;

app.use(express.static(publicPath));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(port, () => {
    console.log("server is up")
});
