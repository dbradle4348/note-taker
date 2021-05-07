const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const app = express();
const uniqid = require('uniqid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    let results = notes;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
  });

app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    // set unique id
    newNote.id = uniqid();
  
    readFile("./db/db.json", "utf8")
    .then((result, err) => {
    return Promise.resolve(JSON.parse(result));
  })
  
    .then(data => {
          //write new file
          writeFile("./db/db.json", JSON.stringify(data));
          res.json(newNote);
    })      
    .catch(err =>{
        if(err) throw err;
    
      })
  });



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });