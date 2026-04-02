const form = new FormData();
form.append('name', 'TestFetchCat' + Date.now());
form.append('subCategories', JSON.stringify(['SubA', 'SubB']));

fetch('http://localhost:5000/api/categories', {
  method: 'POST',
  body: form
}).then(async res => {
  console.log('Status:', res.status);
  console.log('Body:', await res.text());
}).catch(console.error);
