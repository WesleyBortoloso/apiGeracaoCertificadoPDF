const express = require("express");
const app = express();
const pdf = require("html-pdf");
const ejs = require('ejs');
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req, res) => {

  ejs.renderFile('./pages/index.ejs', { name: 'Wesley', cidade: 'São Paulo', curso: 'Cièncias da Computação', horas: '20 horas', data:'10/06/2021' }, (err, html) => {
    if (err) {
      return res.status(500).json({message: 'Error in server '});
    }

    const options = {
      format: 'A4',
      border: {
        right: '8'
      }
    };

    pdf.create(html, options).toFile('./uploads/report.pdf', (error, response) => {
      if (!error) {
          return res.json({ message: 'PDF Generated, /download to download PDF' });
       } else {
          return res.json({ message: 'Fail in Generated PDF'});
        }
      })
  });
});

  app.get('/download', (req, res) => {

    res.type('pdf');
    res.download('./uploads/report.pdf')
  });

app.listen(PORT);
console.log(PORT);