const http = require('http');
const app = require('./app');
// require('./models');

const PORT = 5000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
