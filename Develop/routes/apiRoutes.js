const router = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('./help/fsUtils');
const uuid = require('.help/uuid.js');

router.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

router.post('/', (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      text,
      title,
      note_id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting your new note');
  }

});

router.delete('/:note_id', (req, res) => {
  const noteId = req.params.note_id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      
      const updateNote = json.filter((note) => note.note_id !== noteId);
      
      writeToFile('./db/db.json', updateNote);


      res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});


module.exports = router;