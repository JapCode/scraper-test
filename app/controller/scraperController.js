const { scrapeTitles } = require('../utils/getNews');

async function getNews(req, res, next) {
  try {
    await scrapeTitles().then((titles) => {
      console.log(titles);
    });
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // await page.goto("https://www.upsocl.com/");

    // const titles = await page.evaluate(() => {
    //   return Array.from(document.querySelectorAll(".homeCat a")).map(
    //     (title) => title.innerText
    //   );
    // });
    // // const titleToClick = titles.find((title) => title === "INSPIRACIÓN");
    // // if (titleToClick) {
    // //   const [firstMatchingTitle] = await page.$$(
    // //     `.homeCat a:contains(${titleToClick})`
    // //   );
    // //   await firstMatchingTitle.click();
    // // } else {
    // //   console.log("No matching title found.");
    // // }

    // await browser.close();
    res.json({ message: 'busqueda completada' });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
module.exports = { getNews };
