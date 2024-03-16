const express = require('express');
const os = require('os');

const app = express();
const port = 3000;

const getIPAddress = () => {
  const interfaces = os.networkInterfaces();
  for (const NetworkInterface of Object.values(interfaces)) {
    for (const item of NetworkInterface) {
      if (item.family === 'IPv4' && !item.internal) {
        return item.address;
      }
    }
  }
  return 'Unknown IP';
};

app.get('/', (req, res) => {
  const ipAddress = getIPAddress();
  res.send(`Server: ${ipAddress}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});