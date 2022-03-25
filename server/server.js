const express = require('express');

const formidable = require('formidable');
const fs = require('fs');

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

app.post('/request_logs.txt', function(req, res){
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
    if (err != null) {
      console.log(err)
      return res.status(400).json({ message: err.message });
    }

    const [firstFileName] = Object.keys(files);

    res.json({ filename: firstFileName });
  });
});

app.listen(3000);