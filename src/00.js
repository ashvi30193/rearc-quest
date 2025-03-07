const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');

//const caCert = fs.readFileSync("rearc.crt");
const port = 443;
const key = fs.readFileSync('/etc/ssl/private/tls.key');
const cert = fs.readFileSync('/etc/ssl/certs/tls.crt');

// Bind to 0.0.0.0 for external access
https.createServer({ key, cert }, app).listen(port, '0.0.0.0', () => {
  console.log(`Secure server is running on https://0.0.0.0:${port}`);
});

// Define Routes
app.get('/', function (req, res) {
  const { exec } = require('child_process');
  exec('bin/001', (err, stdout, stderr) => {
    if (err) {
      return res.send(`${stderr}`);
    }
    return res.send(`${stdout}`);
  });
});

app.get('/aws', function (req, res) {
  const { exec } = require('child_process');
  exec('bin/002', (err, stdout, stderr) => {
    return res.send(`${stdout}`);
  });
});

app.get('/docker', function (req, res) {
  const { exec } = require('child_process');
  exec('bin/003', (err, stdout, stderr) => {
    return res.send(`${stdout}`);
  });
});

app.get('/loadbalanced', function (req, res) {
  const { exec } = require('child_process');
  exec('bin/004 ' + JSON.stringify(req.headers), (err, stdout, stderr) => {
    return res.send(`${stdout}`);
  });
});

app.get('/tls', function (req, res) {
  const { exec } = require('child_process');
  exec('bin/005 ' + JSON.stringify(req.headers), (err, stdout, stderr) => {
    return res.send(`${stdout}`);
  });
});

app.get('/secret_word', function (req, res) {
  const { exec } = require('child_process');
  exec('bin/006 ' + JSON.stringify(req.headers), (err, stdout, stderr) => {
    return res.send(`${stdout}`);
  });
});


