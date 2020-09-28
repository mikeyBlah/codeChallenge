const http = require('http');
const { filterPostData } = require('./utils/filterPostData');
const { verifyJson } = require('./utils/verifyJson');
const errorResponse = `{"error": "Could not decode request: JSON parsing failed"}`;
let port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  let response;
  if(req.method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const isJson = verifyJson(parsedBody);
      res.setHeader('Content-Type', 'application/json');
      if(isJson === false) {
        res.statusCode = 400;
        res.write(errorResponse);
      }else {
        response = filterPostData(JSON.parse(parsedBody));
        res.statusCode = 200;
        res.write(response);
      }
      res.end();
    });
  }
});

server.listen(port);