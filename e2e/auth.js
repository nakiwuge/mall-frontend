/* eslint-disable quotes */
const {By} = require('selenium-webdriver');

const Auth = async (driver)=>{
  await driver.get('http://localhost:3000/');
  await driver.findElement(By.linkText('Login')).click();
  await driver.findElement(By.css("input[name='email']")).sendKeys('nakiwuge@gmail.com');
  await driver.findElement(By.css("input[name='passwd']")).sendKeys('000000');
  await driver.findElement(By.css("button[name='submit']")).click();
  driver.manage().setTimeouts( { implicit: 5000 } );
};

module.exports = Auth;
