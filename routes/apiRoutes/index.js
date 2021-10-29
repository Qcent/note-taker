const router = require('express').Router();
const { addNote, writeNotes, validateNote } = require('../../lib/notes');

const { notes } = require('../../db/db.json');

router.get('/notes', (req, res) => {
    console.log("Returning Notes")
    console.dir(notes);
    res.json(notes);
});

router.post('/notes', (req, res) => {
    // set id based on what the next index of the array will be
    //if an id is not supplied. ie. a new note
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = addNote(req.body, notes);
        res.json(note);
    }
});

router.delete('/notes/:id', (req, res) => {
    //find the index of the note with the matching id and store in const index
    const index = notes.findIndex(el => (el.id === req.params.id || parseInt(el.id) === parseInt(req.params.id)));
    if (index > -1) {
        // remove from notes array
        const removed = notes.splice(index, 1);
        //update the DB
        writeNotes(notes);
        //return success
        res.status(200).send("Note removed!");
        console.log("Note removed:");
        console.dir(removed);
    } else {
        res.status(404).send(`Invalid note ID ${req.params.id}`);
    }
});

module.exports = router;