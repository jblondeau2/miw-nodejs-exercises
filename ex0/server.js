const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;

    console.log('http request : '+ res.statusCode);

    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log("\nHey you're HTTP server is running \n");
});