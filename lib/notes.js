const fs = require('fs');
const path = require('path');

function writeNote(body, noteArray) {
    const note = body;
    let newNote = 1;

    //    console.log(noteArray);

    if (!note.id) {
        note.id = noteArray.length.toString();
        newNote = 0;
    }
    noteArray.splice(body.id, newNote, note);

    console.log(noteArray);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: noteArray }, null, 2)
    );
    return note;
}

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    /*  if (!note.id || typeof parseInt(note.id) !== 'number') {
          return false;
      }
    */
    return true;
}

module.exports = { writeNote, validateNote }