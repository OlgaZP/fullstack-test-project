const http = require('http');
const app = require('./app');
// require('./models');

// const PORT = process.env.PORT ?? 5000;
const PORT = 5000;
console.log(`PORT`, PORT);
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`PORT`, PORT);
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
