/* eslint-disable import/no-extraneous-dependencies */
import { Builder, By, Capabilities, until } from 'selenium-webdriver';

import 'chromedriver';

const rootURL = 'http://localhost:8080';
let driver;

const getElementTimeout = 9000;

async function getElementById(id) {
  const el = await driver.wait(until.elementLocated(By.id(id)), getElementTimeout);
  return driver.wait(until.elementIsVisible(el), getElementTimeout);
}

const chromeCapabilities = Capabilities.chrome();
chromeCapabilities.set('chromeOptions', { args: ['--headless', '--no-sandbox'] });

beforeEach((done) => {
  driver = new Builder()
    .forBrowser('chrome')
    .withCapabilities(chromeCapabilities)
    .build();

  driver.get(rootURL).then(done);
});


afterEach((done) => {
  driver.quit().then(done);
});


describe('navbar"', () => {
  it('should have a logo that reads "Notedown"', async () => {
    const el = await getElementById('navbar-logo');

    const expected = 'Notedown';
    const actual = await el.getText();
    expect(actual).toEqual(expected);
  });
});

