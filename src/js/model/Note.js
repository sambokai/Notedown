import Persistence from './Persistence';

const localNoteIdCounter = Persistence.readFromLocalStorage('noteIdCounter');
let noteIdCounter = localNoteIdCounter || 0;

const increment = () => {
  noteIdCounter += 1;
  Persistence.writeToLocalStorage('noteIdCounter', noteIdCounter);
  return noteIdCounter;
};

class Note {
  constructor(body) {
    // noinspection JSUnusedGlobalSymbols
    this.body = body;
    // noinspection JSUnusedGlobalSymbols
    this.id = increment();
  }
}

export default Note;
