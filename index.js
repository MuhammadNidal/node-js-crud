const http = require('http');

let dataStore = [];

// Helper function to get the body data from the request
const getRequestBody = (req, callback) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // Convert Buffer to string
    });
    req.on('end', () => {
        callback(body);
    });
};

// Create the server
const server = http.createServer((req, res) => {
    // Set the response headers
    res.setHeader('Content-Type', 'application/json');
    const { method, url } = req;

    // Handle GET /data (fetch all data)
    if (url === '/' && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({ message: 'Data fetched successfully', data: dataStore }));
    }
    // Handle POST /data (add new data)
    else if (url === '/post' && method === 'POST') {
        getRequestBody(req, (body) => {
            const parsedData = JSON.parse(body);  
            dataStore.push(parsedData);           
            res.writeHead(201);            
            res.end(JSON.stringify({ message: 'Data added successfully', data: parsedData }));
        });
    }
       else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});

// Start the server on port 3000
const port = 3000;
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
