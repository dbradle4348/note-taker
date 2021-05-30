const router = require('express').Router();
const fs = require('fs');


//get notes
router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err;
      dbData = JSON.parse(data);
      res.send(dbData);
    })
  });

//post routes
router.post('/api/notes', (req, res) => {
    const newNote = req.body;
  
    fs.readFile("./db/db.json", (err, data) => {
      if (err) throw err;
      dbData = JSON.parse(data);
      dbData.push(newNote);
      let number = 1;
      dbData.forEach((note, index) => {
        note.id = number;
        number++;
        return dbData;
      });
      console.log(dbData);
      noteData = JSON.stringify(dbData);
      fs.writeFile('./db/db.json', noteData, (err, data) => {
        if (err) throw err;
      });
    });
    res.send("Note posted!")
});


module.exports = router;