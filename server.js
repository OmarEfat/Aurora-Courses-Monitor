const express = require('express');
const puppeteer = require('puppeteer');
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.post('/search', async (req, res) => {
  try {
    const { userID, PIN } = req.body;

    const browser = await puppeteer.launch({
      headless: false
    });

    const page = await browser.newPage();

    await page.goto('https://aurora.umanitoba.ca/ssb/twbkwbis.P_ValLogin');
    await page.waitForSelector("#UserID");
    await page.waitForSelector("#PIN");

    await page.type("#UserID", userID);
    await page.type("#PIN", PIN);

    const submit_btn = await page.$x('/html/body/div[4]/form/p/input[1]');
    await submit_btn[0].click();

    await page.waitForXPath('/html/body/div[4]/table[2]/tbody/tr[3]/td[2]/a');
    const enrolment_btn = await page.$x('/html/body/div[4]/table[2]/tbody/tr[3]/td[2]/a');
    await enrolment_btn[0].click('/html/body/div[4]/table[2]/tbody/tr[3]/td[2]/a');

    await page.waitForXPath('/html/body/div[4]/table[1]/tbody/tr[3]/td[2]/a');
    const registration_exams_btn = await page.$x('/html/body/div[4]/table[1]/tbody/tr[3]/td[2]/a');
    await registration_exams_btn[0].click('/html/body/div[4]/table[1]/tbody/tr[3]/td[2]/a');

    await page.waitForXPath('/html/body/div[4]/table[1]/tbody/tr[6]/td[2]/a');
    const stdn_details_btn = await page.$x('/html/body/div[4]/table[1]/tbody/tr[6]/td[2]/a');
    await stdn_details_btn[0].click('/html/body/div[4]/table[1]/tbody/tr[6]/td[2]/a');

    await page.waitForSelector("#term_id");
    let year = '2023';
    let sem = 'W';

    let final_sem = '';
    if (sem === 'W') final_sem = '10';
    else if (sem === 'F') final_sem = '90';
    else if (sem === 'S') final_sem = '50';

    final_sem = year + final_sem;

    await page.select('#term_id', final_sem);

    const submit_term = await page.$x('/html/body/div[4]/form/input');
    await submit_term[0].click();

    await page.waitForSelector('*');
    const extractedText = await page.$eval('*', (el) => el.innerText);

    res.send(extractedText);
    await browser.close();
  } catch (err) {
    console.error(err);
    res.status(500).send('Oops! Something went wrong. Please try again later.');
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
