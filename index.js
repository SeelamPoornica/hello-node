const http = require("http");
const fs = require("fs");
const path = require("path");
const minimist = require("minimist");

// Step 4: Parse command-line arguments to find the port string
const args = minimist(process.argv.slice(2));
const port = args.port || 3000; // Defaults to 3000 if no port argument is given

// Helper function to stream local HTML files safely
function serveFile(res, fileName, statusCode = 200) {
  const filePath = path.join(__dirname, fileName);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("500 - Internal Server Error");
    } else {
      res.writeHead(statusCode, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
}

// Step 2 & 3: Configure routing logic for HTTP requests
const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === "/registration") {
    serveFile(res, "registration.html");
  } else if (url === "/project") {
    serveFile(res, "project.html");
  } else {
    // Default home route or any fallback landing page file
    serveFile(res, "project.html"); 
  }
});

// Initialize the server listener on the specified port configuration
server.listen(port, () => {
  console.log(`Server successfully started on port ${port}`);
});
