const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

axios.get('https://bulletin.du.edu/undergraduate/majorsminorscoursedescriptions/traditionalbachelorsprogrammajorandminors/computerscience/#coursedescriptionstext')
    .then(response => {
        const $ = cheerio.load(response.data);
        const courses = [];
        $('p.courseblocktitle').each((i,element) => {
        const data =  {
            code: $(element).text().slice(0,9),
            title: $(element).text().slice(10, $(element).text().indexOf('(') - 2)
        };
        if(!(data.code[5] < 3) && !($(element).next().text().includes('Prerequisite'))) {
            courses.push(data);
            console.log(data.code);
            console.log(data.title+ '\n');
            console.log($(element).next().text() + '\n');
        }
        });
        fs.writeFileSync('results/bulletin.json', JSON.stringify({courses}));
    })