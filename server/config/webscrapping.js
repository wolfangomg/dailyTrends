const puppeteer = require('puppeteer');
const elPais = [
    {
        title: '.articulos article:nth-of-type(1) .articulo-titulo',
        body: '.articulos article:nth-of-type(1) .articulo-entradilla',
        image: '.articulos article:nth-of-type(1) .foto--oculta img',
        source: '.articulos article:nth-of-type(1)  .articulo-titulo a',
        publisher: '.articulos article:nth-of-type(1) .articulo-metadatos .firma'
    },
    {
        title: '.articulos article:nth-of-type(2) .articulo-titulo',
        body: '.articulos article:nth-of-type(2) .articulo-entradilla',
        image: '.articulos article:nth-of-type(2) .foto--oculta img',
        source: '.articulos article:nth-of-type(2)  .articulo-titulo a',
        publisher: '.articulos article:nth-of-type(2) .articulo-metadatos .firma'
    },
    {
        title: '.articulos article:nth-of-type(3) .articulo-titulo',
        body: '.articulos article:nth-of-type(3) .articulo-entradilla',
        image: '.articulos article:nth-of-type(3) .foto--oculta img',
        source: '.articulos article:nth-of-type(3)  .articulo-titulo a',
        publisher: '.articulos article:nth-of-type(3) .articulo-metadatos .firma'
    },
    {
        title: '.articulos article:nth-of-type(4) .articulo-titulo',
        body: '.articulos article:nth-of-type(4) .articulo-entradilla',
        image: '.articulos article:nth-of-type(4) .foto--oculta img',
        source: '.articulos article:nth-of-type(4)  .articulo-titulo a',
        publisher: '.articulos article:nth-of-type(4) .articulo-metadatos .firma'
    },
    {
        title: '.articulos article:nth-of-type(5) .articulo-titulo',
        body: '.articulos article:nth-of-type(5) .articulo-entradilla',
        image: '.articulos article:nth-of-type(5) .foto--oculta img',
        source: '.articulos article:nth-of-type(5)  .articulo-titulo a',
        publisher: '.articulos article:nth-of-type(5) .articulo-metadatos .firma'
    }
]
const elMundo = [
    {
        title: '.ue-l-cover-grid__column.size6of12:nth-child(1) .ue-l-cover-grid__unit:nth-child(1) span',
        body: '.ue-l-cover-grid__column.size6of12:nth-child(1) .ue-l-cover-grid__unit:nth-child(1) a',
        image: null,//'.ue-l-cover-grid__column.size6of12:nth-child(1) .ue-l-cover-grid__unit:nth-child(1) img',
        source: '.ue-l-cover-grid__column.size6of12:nth-child(1) .ue-l-cover-grid__unit:nth-child(1) a',
        publisher: '.ue-l-cover-grid__column.size6of12:nth-child(1) .ue-l-cover-grid__unit:nth-child(1) .ue-c-cover-content__byline-name'
    },
    {
        title: '.ue-l-cover-grid__column.size6of12:nth-child(1) .ue-l-cover-grid__unit:nth-child(2) span',
        body: '.ue-l-cover-grid__column.size6of12:nth-child(1) .ue-l-cover-grid__unit:nth-child(2) a',
        image: null, //'.ue-l-cover-grid__column.size6of12:nth-child(1) .ue-l-cover-grid__unit:nth-child(2) img',
        source: '.ue-l-cover-grid__column.size6of12:nth-child(1) .ue-l-cover-grid__unit:nth-child(2) a',
        publisher: '.ue-l-cover-grid__column.size6of12:nth-child(1) .ue-l-cover-grid__unit:nth-child(2)  .ue-c-cover-content__byline-name',
    },
    {
        title: '.ue-l-cover-grid__column.size6of12:nth-child(2) .ue-l-cover-grid__unit span',
        body: '.ue-l-cover-grid__column.size6of12:nth-child(2) .ue-l-cover-grid__unit a',
        image: '.ue-l-cover-grid__column.size6of12:nth-child(2) .ue-l-cover-grid__unit img',
        source: '.ue-l-cover-grid__column.size6of12:nth-child(2) .ue-l-cover-grid__unit a',
        publisher: '.ue-l-cover-grid__column.size6of12:nth-child(2) .ue-l-cover-grid__unit .ue-c-cover-content__byline-name'
    },
    {
        title: '.ue-l-cover-grid__column.size3of12 .ue-l-cover-grid__unit:nth-child(1) span',
        body: '.ue-l-cover-grid__column.size3of12 .ue-l-cover-grid__unit:nth-child(1) a',
        image: '.ue-l-cover-grid__column.size3of12 .ue-l-cover-grid__unit:nth-child(1) img',
        source: '.ue-l-cover-grid__column.size3of12 .ue-l-cover-grid__unit:nth-child(1) a',
        publisher: '.ue-l-cover-grid__column.size3of12 .ue-l-cover-grid__unit:nth-child(1) .ue-c-cover-content__byline-name',
    },
    {
        title: '.ue-l-cover-grid__column.size3of12 .ue-l-cover-grid__unit:nth-child(2) span',
        body: '.ue-l-cover-grid__column.size3of12 .ue-l-cover-grid__unit:nth-child(2) a',
        image: null, //'.ue-l-cover-grid__column.size3of12 .ue-l-cover-grid__unit:nth-child(2) img',
        source: '.ue-l-cover-grid__column.size3of12 .ue-l-cover-grid__unit:nth-child(2) a',
        publisher: '.ue-l-cover-grid__column.size3of12 .ue-l-cover-grid__unit:nth-child(2) .ue-c-cover-content__byline-name',
    }
]
const scrap = {
    elPais,
    elMundo,
    getFeedNews: async function getData(url, arrayItems) {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url, { waitUntil: 'networkidle0' });
            let data = await page.evaluate((array) => {
                    let nArray = array.map((el) => {
                        const items = Object.keys(el);
                        const nItems = items.reduce((total, key) => {
                            let value, element = document.querySelector(el[key]);
                            switch (key) {
                                case 'image': value = element ? element.src : null;
                                    break;
                                case 'source': value = element ? element.href : null;
                                    break;
                                default:
                                    value = element ? element.innerText : null;
                            }
                            return total = { ...total, [key]: value }
                        }, {})
                        return nItems;
                    })
                    return nArray;
            }, arrayItems);
            await browser.close();
            return data;
        }
        catch (err) {
            console.log('Failed extracting data:' + err);
        }
    }
}
module.exports = scrap;