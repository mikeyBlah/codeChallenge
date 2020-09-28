const http = require('http');
let port = process.env.PORT || 8080;

function filterJson(jsonObject) {
  const data = jsonObject.payload;
  const newObject = {
    response: [],
  };
  for(let i = 0; i < data.length; i++) {
    if(data[i].drm === true && data[i].episodeCount > 0) {
      let showItem = {};
      showItem.image = data[i].image.showImage;
      showItem.slug = data[i].slug;
      showItem.title = data[i].title;
      newObject.response.push(showItem);
    }
  }
  return JSON.stringify(newObject);
}

const verifyJson = (check) => {
  try { 
    JSON.parse(check); 
    return true; 
  } 
  catch (err) { 
    return false; }
}

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
        res.write(JSON.stringify({error: "Could not decode request: JSON parsing failed"}));
      } else {
        response = filterJson(JSON.parse(parsedBody));
        res.statusCode = 200;
        res.write(response);
      }
      res.end();
    });
  }
})

server.listen(port);