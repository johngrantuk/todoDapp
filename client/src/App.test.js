import puppeteer from 'puppeteer';
// import dappeteer from '../node_modules/dappeteer/dist/index.js';
var dappeteer = require("dappeteer")

let browser;
let page;
let metamask;
/*
// 2
beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false
  });
  page = await browser.newPage();
  await page.goto("http://localhost:3000/");
});

// 3
test("renders learn react link", async () => {
  await page.waitForSelector(".App");

  const header = await page.$eval("#header-1", e => e.innerHTML);
  expect(header).toBe(`TO DO DAPP`);
  /*
  const link = await page.$eval("#App-header>a", e => {
    return {
      innerHTML: e.innerHTML,
      href: e.href
    };
  });
  expect(link.innerHTML).toBe(`Learn React`);
  expect(link.href).toBe("https://reactjs.org/");
  */
//});
/*
test("renders counter", async () => {
  await page.waitForSelector(".header");

  const header = await page.$eval(".header", e => e.innerHTML);
  expect(header).toBe("Counter");
});
*/
/*
beforeAll(async () => {
  browser = await dappeteer.launch(puppeteer);
  metamask = await dappeteer.getMetamask(browser);
  metamask.switchNetwork('localhost');
  page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  await metamask.approve();
  await page.bringToFront();
  await page.waitFor(1000);
  await page.reload();
  await page.waitForSelector('#header-1');
  /*
  const header = await page.$eval("#header-1", e => e.innerHTML);
  expect(header).toBe(`TO DO DAPP`);
  await page.waitFor(3000);
  jest.setTimeout(30000);
  */
// });

test("should alert when no new task info added", async () => {


  // await page.waitFor(1000);
  /*
  browser = await dappeteer.launch(puppeteer)
  const metamask = await dappeteer.getMetamask(browser)

  console.log(metamask)
  */
  // create or import an account
  // await metamask.createAccount()
  // await metamask.importAccount('already turtle birth enroll since...')

  // you can change the network if you want
  /*
  await metamask.switchNetwork('localhost');

  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  */

  // await page.waitForSelector('#header-1');
  // console.log('Header here.')
  // await page.waitFor(5000);
  // await metamask.approve();
  // await page.waitFor(5000);
  // console.log(page)
  /*
  await page.bringToFront();
  await page.waitFor(1000);
  await page.reload();
  await page.waitFor(3000);
  */
  /*
  let pages = await browser.pages();
  console.log('Pages:')
  console.log(pages)
  */

  // go to a dapp and do something that prompts MetaMask to confirm a transaction
  jest.setTimeout(30000);
  browser = await dappeteer.launch(puppeteer);
  metamask = await dappeteer.getMetamask(browser);
  console.log(metamask)
  await metamask.importPK('0x87a4e34fe562738085ad492a02f62774fb298efebb3bf3619e35ec0e7496f66b')
  await metamask.switchNetwork('localhost');
  page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  await metamask.approve();
  await page.bringToFront();
  await page.waitFor(1000);
  await page.reload();
  await page.waitForSelector('#header-1');

  await page.waitForSelector('#makeNewTask');
  const payButton = await page.$('#makeNewTask')
  await payButton.click()

  const alert = await page.$eval("#NewTaskAlert", e => e.innerText);
  console.log(alert)
  expect(alert).toBe(`Please Enter Some Task Info`);

  // await metamask.confirmTransaction()


});

test("No Initial Tasks", async () => {

  const tasks = await page.$eval("#taskDisplay", e => e.innerHTML);

  expect(tasks).toBe(`No Tasks! Looks Like You're Nice &amp; Relaxed 😊`);
});

test("Add New Task", async () => {

  await page.click('#newTaskInput');
  await page.keyboard.type('Johns New Task');

  const payButton = await page.$('#makeNewTask');
  await payButton.click();

  await metamask.confirmTransaction();
  /*
  const tasks = await page.$eval("#taskDisplay", e => e.innerHTML);

  expect(tasks).toBe(`No Tasks! Looks Like You're Nice &amp; Relaxed 😊`);
  */
});

// 4
/*
afterAll(() => {
  browser.close();
});
*/


/*
async function main() {

  const browser = await dappeteer.launch(puppeteer)
  const metamask = await dappeteer.getMetamask(browser)

  // create or import an account
  // await metamask.createAccount()
  await metamask.importAccount('already turtle birth enroll since...')

  // you can change the network if you want
  await metamask.switchNetwork('ropsten')

  // go to a dapp and do something that prompts MetaMask to confirm a transaction
  const page = await browser.newPage()
  await page.goto('http://my-dapp.com')
  const payButton = await page.$('#pay-with-eth')
  await payButton.click()

  // 🏌
  await metamask.confirmTransaction()

}

main()
*/
