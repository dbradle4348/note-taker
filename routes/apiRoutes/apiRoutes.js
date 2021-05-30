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
router.post('/notes', (req, res) => {
    const userNotes = req.body;
  
    fs.readFile("./db/db.json", (err, data) => {
      if (err) throw err;
      dbData = JSON.parse(data);
      dbData.push(userNotes);
      let number = 1;
      dbData.forEach((note, index) => {
        note.id = number;
        number++;
        return dbData;
      });
      console.log(dbData);
      stringData = JSON.stringify(dbData);
      fs.writeFile('../../db/db.json', stringData, (err, data) => {
        if (err) throw err;
      });
    });
    res.send("Note posted!")
});

module.exports = router;