const FormData = require('form-data');
const fs = require('fs');
const http = require('http');

const form = new FormData();
form.append('name', 'TestScriptCat' + Date.now());
form.append('subCategories', JSON.stringify(['Sub1', 'Sub2']));

const request = http.request({
  method: 'post',
  host: 'localhost',
  port: 5000,
  path: '/api/categories',
  headers: form.getHeaders()
});

form.pipe(request);

request.on('response', function(res) {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log('Response:', res.statusCode, body));
});
