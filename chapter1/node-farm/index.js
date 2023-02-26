const http = require("http");
const fs = require("fs");
const url = require("url");

const slugify = require("slugify");

const { replaceTemplate } = require("./modules/replaceTemplate");

const overviewTemplate = fs.readFileSync(`${__dirname}/chapter1/templates/template-overview.html`, "utf-8");
const cardTemplate = fs.readFileSync(`${__dirname}/chapter1/templates/template-card.html`, "utf-8");
const productTemplate = fs.readFileSync(`${__dirname}/chapter1/templates/template-product.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/chapter1/dev-data/data.json`, "utf-8");

const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  switch (pathname) {
    case "/":
    case "/overview":
      res.writeHead(200, {
        "Content-type": "text/html",
      });

      const cardHtml = dataObj.map((element) => replaceTemplate(cardTemplate, element)).join("");

      const output = overviewTemplate.replace(/{%PRODUCT_CARDS%}/g, cardHtml);
      res.end(output);
      break;
    case "/product":
      res.writeHead(200, {
        "Content-type": "text/html",
      });
      const product = dataObj[Number(query.id)];

      const productOutput = replaceTemplate(productTemplate, product);
      res.end(productOutput);
      break;
    case "/api":
      res.writeHead(200, {
        "Content-type": "application/json",
      });
      res.end(data);
      break;
    default:
      res.writeHead(404, {
        "Content-type": "text/html",
      });
      res.end("<h1>Page cannot be Found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server running on port 8000");
});
