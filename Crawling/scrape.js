const puppeteer = require('puppeteer');

(async function main() {
    try {
//////////Open browser and navigate to Amazon
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36');

        await page.goto('http://www.amazon.com/'); //Wait for Amazon to open
        ////////Select "Books," from dropdown menu
        const option = (await page.$x('//*[@id="searchDropdownBox"]/option[text() = "Books"]'))[0];
        const value = await(await option.getProperty('value')).jsonValue();
        await page.select('#searchDropdownBox', value);
        ////////End of select from dropdown menu
        await page.type('#twotabsearchtextbox', 'Warhammer'); //Type "Warhammer," in the search field
        await page.click('#nav-search > form > div.nav-right > div > input'); //Starts search
        await page.waitForSelector('#atfResults'); //Waits for page to change
/////////////////////////

/////////// Scraping Data From Results
        const sections = await page.$$("#s-results-list-atf"); //Wait until this selector loads on page
        const lis = await page.$$('#s-results-list-atf >li'); //Grab the li elements
        ///////Loop through the li elements
        for (const li of lis){
            ////Grab the title
            const title = await li.$eval('h2', h2 => h2.innerText);
            // var img = document.getElementByClass("s-access-image cfMarker").src  //grab the url
            // var price = document.getElementBy
            console.log('Title: '+title)
        }

    console.log('done');
    await browser.close();

    } catch (e){
        console.log('our error', e)
    }
    
})();