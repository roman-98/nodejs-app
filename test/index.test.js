const express = require('express');
const os = require('os');
const request = require('supertest');
const assert = require('assert');

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
  res.send(`Сервер: ${ipAddress}`);
});

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

describe('Server', () => {
  after(() => {
    server.close();
  });

  it('should return IP address with "Сервер:" prefix', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.text.startsWith('Сервер:'), true);
        done();
      });
  });

  it('should return a valid IP address or "Unknown IP"', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const ipAddress = res.text.split(': ')[1];
        const isValidIP = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(ipAddress) || ipAddress === 'Unknown IP';
        assert.strictEqual(isValidIP, true);
        done();
      });
  });
});