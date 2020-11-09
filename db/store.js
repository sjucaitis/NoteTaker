const util = require("util");
const fs = require("fs");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
​
class Store {
  constructor() {
      this.lastId = 0;
  }

  read() {
    return readFileAsync("db/db.json", "utf8");
  }
​
  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }
​
  getNotes() {
    return this.read().then((notes) => {
        // here you will write a function that uses the above read function and parses the notes from the file 
      let flaggedNotes;
​ // sends empty array if necessary
        try {
            flaggedNotes = [].concat(JSON.parse(notes));
        }   catch (err) {
            flaggedNotes = [];
        }
      // If notes isn't an array or can't be turned into one, send back a new empty array
    
      return flaggedNotes;
    });
  }
​
  addNote(note) {
    // set up variables with our notes data here
​   
    const { title, text } =  note;
​
    // Error handle here, if we have no title or text added throw a new error explaining what is wrong
    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }
​
    // Add a unique id to note
    const newNote = { title, text, id: ++this.lastID };
​
    // Get all notes, add the new note, write all the updated notes, return the newNote
    return this.getNotes()
        .then(notes => [...notes, newNote])
        .then(moreNotes => this.write(moreNotes))
        .then(() => newNote);
  }
​
  removeNote(id) {
    // Get all notes, remove the note with the given id, write the filtered notes
    return this.getNotes()
        .then(notes => notes.filter(note => note.id !== parseInt(id)))
        .then(redactedNotes => this.write(redactedNotes));

  }
}
​
module.exports = new Store();
​