import puppeteer from "puppeteer"
import fs from "fs";
import moment from "moment";
import hbs from "handlebars";

const compile = async function (templatePath, data) {
    const html = fs.readFileSync(templatePath, 'utf-8')
    return hbs.compile(html)(data);
}

hbs.registerHelper('dateFormat', function (value, format) {
    return moment(value).format(format);
})

const generator = async (data, templatePath) => {
    return new Promise(async (resolve, reject) => {
        try {

            const browser = await puppeteer.launch({
                headless: false,
                args: ['--headless'],
              });
            const page = await browser.newPage();

            const content = await compile(templatePath, data)

            await page.setContent(content);
            await page.emulateMediaType('screen');

            const pdfBuffer = await page.pdf({
                format: 'A4',
                printBackground: true,
            });

            await browser.close();

            resolve(pdfBuffer);
        } catch (error) {
            reject(error);
        }
    });
};

export default generator;