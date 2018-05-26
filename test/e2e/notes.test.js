import { Builder, By, Capabilities } from 'selenium-webdriver';

import 'chromedriver';

const rootURL = 'http://localhost:8080';
let driver;

const chromeCapabilities = Capabilities.chrome();
chromeCapabilities.set('chromeOptions', { args: ['--headless', '--no-sandbox'] });

const initializeDriver = (done) => {
  driver = new Builder()
    .forBrowser('chrome')
    .withCapabilities(chromeCapabilities)
    .build();

  driver.get(rootURL).then(done);
};

const quitDriverAndClearLocalStorage = (done) => {
  driver.getLocalStorage().clear();
  driver.quit().then(done);
};

describe('After fresh loading of the app', () => {
  const selectors = {
    textEditor: By.css('.texteditor'),
    textEditorTextarea: By.css('.texteditor textarea'),
    newNoteButton: By.id('new-note-button'),
    noteList: By.id('note-list'),
    noteListItem: By.id('note-list-item'),
    noteListItemTitle: By.id('note-list-item-title'),
  };

  describe('1', () => {
    beforeAll(initializeDriver);
    afterAll(quitDriverAndClearLocalStorage);

    test('textEditor should be deactivated / non-focusable', async () => {
      const textEditorTextarea = await driver.findElement(selectors.textEditorTextarea);
      expect(await textEditorTextarea.isEnabled()).toBe(false);
    });

    test('new-note button should be activated / clickable and add a note to the list', async () => {
      const newNoteButton = await driver.findElement(selectors.newNoteButton);
      const noteList = await driver.findElement(selectors.noteList);

      newNoteButton.click();

      const noteListItems = await noteList.findElements(selectors.noteListItem);

      expect(noteListItems).toHaveLength(1);
    });

    test('newly created note should be selected', async () => {
      const noteList = await driver.findElement(selectors.noteList);
      const noteListItems = await noteList.findElements(selectors.noteListItem);

      const classes = await noteListItems[0].getAttribute('class').then(classesString =>
        classesString.trim().split(' ').map(classString => classString.trim()));

      expect(classes).toContain('active');
    });

    test('new-note button should be deactivated / non-clickable ' +
      'after having just clicked it / having an empty note', async () => {
      const newNoteButton = await driver.findElement(selectors.newNoteButton);
      const noteList = await driver.findElement(selectors.noteList);

      newNoteButton.click();

      const noteListItems = await noteList.findElements(selectors.noteListItem);

      expect(noteListItems).toHaveLength(1);
    });

    test('textEditor should be active / focusable', async () => {
      const textEditorTextarea = await driver.findElement(selectors.textEditorTextarea);
      expect(await textEditorTextarea.isEnabled()).toBe(true);
    });

    test("selected note title should show first line of the note's body", async () => {
      const textEditor = await driver.findElement(selectors.textEditor);
      const textEditorTextarea = await driver.findElement(selectors.textEditorTextarea);
      const noteList = await driver.findElement(selectors.noteList);
      const noteListItems = await noteList.findElements(selectors.noteListItem);

      await textEditorTextarea.isDisplayed();
      await textEditor.isDisplayed();

      textEditor.click();
      textEditorTextarea.sendKeys('    This is the title of this Note. \n \n ' +
        'Yesterday i was going down the street when suddenly a unicorn ...');

      const noteListItem = await noteListItems[0].findElements(selectors.noteListItemTitle).then(elements => elements[0]);
      const noteListItemText = await noteListItem.getText();

      expect(noteListItemText).toBe('This is the title of this Note.');
    });
  });

  describe('2', () => {
    beforeAll(initializeDriver);
    afterAll(quitDriverAndClearLocalStorage);

    it('test 2', () => {
      expect(2).toEqual(2);
    });
  });
});

