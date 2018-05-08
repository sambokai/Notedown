let noteIdCounter = 0;

const increment = () => {
  noteIdCounter += 1;
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
