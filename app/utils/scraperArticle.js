// eslint-disable-next-line import/no-extraneous-dependencies
const { chromium } = require('playwright');
const { config } = require('../../config');

const { baseUrl } = config;

async function scraperArticle(categoryPath, items) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(`${baseUrl}${categoryPath}`);

  const titlesAndLinks = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.titulo-home a')).map((title) => ({
      link: title.href,
    })),
  );

  async function visitPages(links, index = 0, results = []) {
    if (index === items) return results;

    const { link } = links[index];
    await page.goto(link);
    const title = await page.evaluate(
      () => document.querySelector('h1').innerText,
    );
    const author = await page.evaluate(
      () => document.querySelector('#author-avatar a').innerText,
    );
    const publishedAt = await page.evaluate(
      () => document.querySelector('#publicado-fecha').innerText,
    );
    const category = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll('.entry-meta.categor a'),
        (element) => element.innerText,
      ),
    );
    const bodyDescription = await page.evaluate(
      () => document.querySelector('#descripcion').innerText,
    );
    results.push({
      sourceLink: link,
      title,
      author,
      publishedAt,
      category,
      bodyDescription,
    });

    return visitPages(links, index + 1, results);
  }

  const results = await visitPages(titlesAndLinks);

  await browser.close();

  return results;
}

module.exports = { scraperArticle };
