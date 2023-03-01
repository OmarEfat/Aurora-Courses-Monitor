const puppeteer = require('puppeteer');

(async()=>
{
    // Creating a browser 
    const browser = await puppeteer.launch();

    //Opening a new page
    const page = await browser.newPage();

    // Go to Aurora login page 
    await page.goto('https://aurora.umanitoba.ca/banprod/twbkwbis.P_WWWLogin');

    await page.waitForSelector("#UserID");
    await page.waitForSelector("#PIN");

    // Enter User ID and PIN
    await page.type("#UserID","Remove me and enter User ID");
    await page.type("#PIN","Remove me and enter PIN");
    
    const submit_btn = await page.$x('/html/body/div[4]/form/p/input[1]')
    await submit_btn[0].click();
    
    await page.waitForXPath('/html/body/div[4]/table[2]/tbody/tr[3]/td[2]/a')
    const enrolment_btn = await page.$x('/html/body/div[4]/table[2]/tbody/tr[3]/td[2]/a')
    await enrolment_btn[0].click('/html/body/div[4]/table[2]/tbody/tr[3]/td[2]/a')

    await page.waitForXPath('/html/body/div[4]/table[1]/tbody/tr[3]/td[2]/a')
    const registration_exams_btn = await page.$x('/html/body/div[4]/table[1]/tbody/tr[3]/td[2]/a')
    await registration_exams_btn[0].click('/html/body/div[4]/table[1]/tbody/tr[3]/td[2]/a')

    await page.waitForXPath('/html/body/div[4]/table[1]/tbody/tr[6]/td[2]/a')
    const stdn_details_btn = await page.$x('/html/body/div[4]/table[1]/tbody/tr[6]/td[2]/a')
    await stdn_details_btn[0].click('/html/body/div[4]/table[1]/tbody/tr[6]/td[2]/a')

    await page.waitForSelector("#term_id");
    let year  = '2023'; // Enter year
    let sem = 'W'; // Enter semester => W for winter , S for summer , F for Fall


    let final_sem  = '';
    if(sem ==='W')
    final_sem = '10';
    else if(sem === 'F')
    final_sem ='90';
    else if(sem ==='S')
    final_sem = '50'

    final_sem = year + final_sem;

    await page.select('#term_id', final_sem);


 
    const submit_term = await page.$x('/html/body/div[4]/form/input')
    await submit_term[0].click();


    await page.waitForSelector('*');

    const extractedText = await page.$eval('*', (el) => el.innerText);
    console.log(extractedText);
    await browser.close();
})();