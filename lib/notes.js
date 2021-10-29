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

    if (newNote == 1) {

        //find the index of the note with the matching id and store in const index
        const index = noteArray.findIndex(el => (el.id === body.id || parseInt(el.id) === parseInt(body.id)));
        if (index > -1) {
            // update entry in notes array
            noteArray.splice(index, 1, note);

            console.log("Note Edited:");
        } else {
            console.log("Note Not Found! @ index: " + index);
        }


    } else {

        noteArray.splice(body.id, newNote, note);
        console.log("Note Added:");
    }
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