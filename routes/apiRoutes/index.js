const router = require('express').Router();
const { writeNote, validateNote } = require('../../lib/notes');

const { notes } = require('../../db/db.json');

router.get('/notes', (req, res) => {
    console.dir(notes);
    res.json(notes);
});

router.post('/notes', (req, res) => {
    // set id based on what the next index of the array will be
    //if an id is not supplied. ie. a new note
    if (!req.body.id) {
        req.body.id = notes.length.toString();
    }

    if (!validateNote(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    } else {
        const note = writeNote(req.body, notes);
        res.json(note);
    }
});

/*
  router.delete('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
  });
*/
module.exports = router;