/* eslint-disable quotes */
const {Builder, By,until} = require('selenium-webdriver');
const assert = require('chai').assert;
const  expect = require('chai').expect;

describe("Login", async() =>{

  let driver;

  beforeEach(async ()=> {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://localhost:3000/');
    await driver.findElement(By.linkText('Login')).click();
  });
  afterEach(() =>  driver.quit());

  it('Should login successfully', async ()=> {
    await driver.findElement(By.css("input[name='email']")).sendKeys('nakiwuge@gmail.com');
    await driver.findElement(By.css("input[name='passwd']")).sendKeys('000000');
    await driver.findElement(By.css("button[name='submit']")).click();

    const response= await driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/div[1]/div[2]/div/header/span[1]")), 5000);
    const title = await response.getAttribute("innerHTML");

    assert.equal('Items',title, '== coerces values to strings');
  });

  it('Should throw error if password is wrong', async ()=> {
    await driver.findElement(By.css("input[name='email']")).sendKeys('nakiwuge@gmail.com');
    await driver.findElement(By.css("input[name='passwd']")).sendKeys('00000099');
    await driver.findElement(By.css("button[name='submit']")).click();

    let error = await driver.findElement(By.className('error'));

    await driver.wait(until.elementTextIs(error,'Wrong email or password'), 5000);
    expect(await error.getText()).to.include('Wrong');
  });
});
