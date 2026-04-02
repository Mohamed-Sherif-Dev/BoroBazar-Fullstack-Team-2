const mockCats = [
  { name: 'Electronics', subCategories: ['Mobile Phones', 'Laptops', 'Audio & Headphones', 'Wearables'] },
  { name: 'Clothing & Apparel', subCategories: ['Men\'s Fashion', 'Women\'s Fashion', 'Kids & Babies', 'Accessories'] },
  { name: 'Home & Kitchen', subCategories: ['Furniture', 'Home Decor', 'Kitchenware', 'Bedding'] },
  { name: 'Health & Beauty', subCategories: ['Skincare', 'Makeup', 'Hair Care', 'Fragrances'] },
  { name: 'Sports & Outdoors', subCategories: ['Exercise & Fitness', 'Outdoor Gear', 'Cycling', 'Athletic Shoes'] }
];

async function seed() {
  console.log('Seeding categories...');
  for (const c of mockCats) {
    const form = new FormData();
    form.append('name', c.name);
    form.append('subCategories', JSON.stringify(c.subCategories));

    try {
      const res = await fetch('http://localhost:5001/api/categories', {
        method: 'POST',
        body: form
      });
      console.log(`Submitted ${c.name} - Status: ${res.status}`);
      if (!res.ok) console.log(await res.text());
    } catch(err) {
      console.error(`Failed ${c.name}:`, err.message);
    }
  }
  console.log('Done!');
}

seed();
