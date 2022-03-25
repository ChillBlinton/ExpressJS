const fs = require('fs');
const express = require('express');
const path = require('path');
let urlLogger = (req, res, next) => {
    let url = req.url;
    console.log(log);
    fs.appendFile("request_logs.txt", log + "\n", err => {
        if (err) {
          console.log(err);
        }
      });
    next();
}
let app = express();

// app.get('/', (req, res, next) => {
//     res.sendFile(path.join(__dirname, '../public/index.html'))

// });

// app.get('/css/styles.css', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/css/styles.css'));
// });

app.use(express.static(path.join(__dirname, '../public')));

app.use(urlLogger);

app.listen(3000);