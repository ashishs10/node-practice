// importing the file system module

//reading file synchronously
// const fs = require('fs');

// const data = fs.readFileSync('./starter/txt/input.txt', 'utf-8')

// console.log(data);

// //writing into a file synchronously
// const textIn = `This is amazing to learn coding. Gives peace. ${data}`;
// fs.writeFileSync('./starter/txt/output.txt', textIn);
// console.log("File written");

// const data2 = fs.readFileSync('./starter/txt/output.txt', 'utf-8');
// console.log(data2)

//reading and writing files asynchronously

// const data = fs.readFile('./txt/input.txt', 'utf-8', (err, data) =>
// {
//     console.log(data);
// });

// console.log("Reading data from file...");
// console.log("Data: ");

// starting a server

const http = require('http');
const url = require('url');
const fs = require('fs');
const { dirname } = require('path');
const { log } = require('console');

//GET THE DATA - DATA THAT NEEDS TO BE LOADED ONLY ONCE
//CAN BE FETCHED SYNCHRONOUSLY

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

//get the template data
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct= fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
// comsole.log(tempCard);
// comsole.log(tempOverview);
// comsole.log(tempProduct);

//replace template function
const replaceTemplate = (temp, product) =>
{
    let output = temp.replace(/{%PRODUCT_NAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%ID%}/g, product.id);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    
    return output;
}

// dataObj.map(el => console.log(el.description));


// creating the server
const server = http.createServer((req, res)=>
{   
    const pathName = req.url;

    //OVERVIEW
    if (pathName === "/" || pathName === "/overview") 
    {
        res.writeHead(200, {'Content-type' : 'text/html'});
        //loop through dataObj and replace the placeholders in overview with the objects

        // console.log(tempCard);
        // console.log(dataObj);
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join("");
        // console.log(cardsHtml);
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);


    }
    //PRODUCT
    else if ( pathName === "/product") 
    { 
        res.end("This is product page");
    }
    else 
    {
        res.end("Page Does Not Exist!");
    }

    // res.end("Hello there from the server");
});

server.listen(8000,'127.0.0.1', ()=>
{
    console.log("Listening on port 8000...");
});

