const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const app = express();
const uniqid = require('uniqid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//html routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
});

//api routes
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err;
      db = JSON.parse(data);
      res.send(dbData);
    })
  });

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
  
    fs.readFile("./db/db.json", (err, data) => {
      if (err) throw err;
      dbData = JSON.parse(data);
      let number = 1;
      dbData.forEach((note, index) => {
        note.id = number;
        number++;
        return dbData;
      });
      console.log(dbData);
      stringData = JSON.stringify(dbData);
      fs.writeFile('./db/db.json', stringData, (err, data) => {
        if (err) throw err;
      });
    });
    res.send("Note posted!")
});




app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });