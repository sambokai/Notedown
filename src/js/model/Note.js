import Persistence from './Persistence';

const localNoteIdCounter = Persistence.readFromLocalStorage('noteIdCounter');
let noteIdCounter = localNoteIdCounter || 0;

const increment = () => {
  noteIdCounter += 1;
  Persistence.writeToLocalStorage('noteIdCounter', noteIdCounter);
  return noteIdCounter;
};

class Note {
  /**
   * Instantiates a Note from a 'dumb' JS object.
   * @param object Javascript object with a shape that
   * mirrors the signature of the Note class.
   * @returns {Note}
   */
  static fromObject(object) {
    const note = new Note(
      object._body,
      object.id,
      object.createdOn,
    );
    note.lastChange = object.lastChange;
    return note;
  }

  constructor(body, id = increment(), createdOn = Date.now()) {
    this._body = body;
    // noinspection JSUnusedGlobalSymbols
    this.createdOn = createdOn;
    this.lastChange = this.createdOn.valueOf();
    // noinspection JSUnusedGlobalSymbols
    this.id = id;
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
