// eslint-disable-next-line import/no-extraneous-dependencies
const { chromium } = require('playwright');

async function scrapeTitles() {
  // Iniciar una sesión de navegador
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.upsocl.com/inspiracion/');

  const titlesAndLinks = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.titulo-home a')).map((title) => ({
      link: title.href,
    })),
  );

  async function visitPages(links, index = 0, results = []) {
    if (index === 3) return results;

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
  console.log(results);

  // Cerrar la sesión de navegador
  await browser.close();

  // Devolver los títulos de noticias
}

module.exports = { scrapeTitles };
