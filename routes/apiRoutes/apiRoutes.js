const router = require("express").Router();
const fs = require("fs");

//get notes
router.get("/notes", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    dbData = JSON.parse(data);
    res.send(dbData);
  });
});

//post routes
router.post("/api/notes", (req, res) => {
  const userNote = req.body;

  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    const notesArray = JSON.parse(data);
    userNote.id = generateUniqueId({ length: 8 });
    notesArray.push(userNote);
    console.log("Note Posted!");
    res.send(notesArray);
  });
});

module.exports = router;
