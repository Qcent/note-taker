const fs = require('fs');
const path = require('path');

function addNote(body, noteArray) {
    const note = body;
    let newNote = 1;

    if (!note.id) {
        // if no id is provided use the curent timestamp
        note.id = Date.now();
        // for .splice to insert a new member and overwrite 0 existing members
        newNote = 0;
    }
    noteArray.splice(body.id, newNote, note);

    console.log("Note Added:");
    console.dir(body);

    writeNotes(noteArray);
    return note;
}

function writeNotes(noteArray) {
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: noteArray }, null, 2)
    );
};

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
};

module.exports = { addNote, writeNotes, validateNote }