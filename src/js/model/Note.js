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
    this._body = body;
    // noinspection JSUnusedGlobalSymbols
    const currentDatetime = Date.now();
    this.created = currentDatetime;
    this.lastChange = currentDatetime;
    // noinspection JSUnusedGlobalSymbols
    this.id = increment();
  }

  get body() {
    return this._body;
  }

  set body(text) {
    this.lastChange = Date.now();
    this._body = text;
  }
}

export default Note;
