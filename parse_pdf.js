import fs from 'fs';
import pkg from 'pdf-parse';
const pdfParse = pkg;

let dataBuffer = fs.readFileSync('C:/Users/thari/Downloads/new cv/v17/THARINDU JAYASANKHA .pdf');

pdfParse(dataBuffer).then(function(data) {
    fs.writeFileSync('C:/Users/thari/Downloads/tharindu-jayasankha-_-software-engineer/parsed_cv.txt', data.text);
    console.log("Done");
}).catch(console.error);
