/* eslint-disable quotes */
const {Builder, By, until} = require('selenium-webdriver');
const assert = require('chai').assert;
const  expect = require('chai').expect;
const  Auth = require('./auth');
describe("Store", async() =>{

  let driver;

  beforeEach(async ()=> {
    driver = await new Builder().forBrowser('chrome').build();
    await Auth(driver);
    await driver.findElement(By.linkText('Stores')).click();

  });
  afterEach(() =>  driver.quit());

  it('Should add store successfully', async ()=> {
    await driver.findElement(By.css("button[name='add-store']")).click();
    await driver.findElement(By.id('store-name')).sendKeys('E2E Store');
    await driver.findElement(By.id('store-description')).sendKeys('We deal in all goods');
    await driver.findElement(By.id('store-category')).click();
    await driver.findElement(By.xpath('//*[@id="menu-"]/div[3]/ul/li[1]')).click();
    await driver.findElement(By.css("button[name='sub-store']")).click();

    const response = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[1]/div[2]/div/div[1]/a/div/div[2]/div/h6[1]')),5000);
    const store = await response.getText();
    expect(store).to.be.a('string','E2E Store');
  });

  it('Should throw error if user clicks submit without required fields', async ()=> {
    await driver.findElement(By.css("button[name='add-store']")).click();
    await driver.findElement(By.id('store-description')).sendKeys('We deal in all goods');
    await driver.findElement(By.css("button[name='sub-store']")).click();

    let error = await driver.findElement(By.className('error'));
    await driver.wait(until.elementTextIs(error,'Please Fill in all fields on this form'), 5000);
    expect(await error.getText()).to.include('Please Fill in all fields on this form');
  });

  it('Should delete store successfully', async ()=> {

    const response = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[1]/div[2]/div/div[1]/a/div/div[2]/div/h6[1]')),5000);
    const store = await response.getText();
    if(await store === 'E2E Store'){
      await response.click();
      await driver.findElement(By.xpath('//*[@id="root"]/div/div[1]/div[2]/section/div/div[1]/div[3]/div[2]/p/a')).click();
      await driver.findElement(By.xpath('//*[@id="root"]/div/div[1]/div[2]/section/div/div[2]/div/div/div[3]/span[2]')).click();
      await driver.findElement(By.xpath('//*[@id="deleteModal"]/div/div/button[2]/span[1]')).click();
    }
    const result = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[1]/div[2]/div/div[1]/a/div/div[2]/div/h6[1]')),5000);
    const newStore = await result.getText();

    assert.notEqual('E2E Store',newStore);
  });
});

