import Note from './Note';

describe('Note', () => {
  it("should auto increment it's id", () => {
    const note1 = new Note('');
    const note2 = new Note('');
    const note3 = new Note('');

    expect(note1.id).toBe(1);
    expect(note2.id).toBe(2);
    expect(note3.id).toBe(3);
  });

  it('should be able to parse a serialized object and initialize a Note object from it', () => {
    const serializedNote = {
      _body: 'This is a test.',
      id: 123,
      createdOn: new Date(2018, 0, 1).valueOf(),
      lastChange: new Date(2018, 0, 2).valueOf(),
    };

    expect(Note.fromObject(serializedNote).body).toBe(serializedNote._body);
    expect(Note.fromObject(serializedNote).id).toBe(serializedNote.id);
  });

  it("should allow updating it's body", () => {
    const note = new Note('ABC');
    note.body = 'XYZ';
    expect(note.body).toBe('XYZ');
  });


  it("should update it's lastChange property upon updating it's body", (done) => {
    const note = new Note('ABC');
    const lastChangeBeforeBodyUpdate = note.lastChange.valueOf();

    setTimeout(() => {
      note.body = 'XYZ';
      expect(lastChangeBeforeBodyUpdate).toBeLessThan(note.lastChange);
      done();
    }, 50);
  });
});
