import { products, categoryEmojis, deals } from './src/data/products';
import https from 'https';

const checkUrl = (url: string) => {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (e) => {
      resolve({ url, status: 'error', message: e.message });
    });
  });
};

async function run() {
  const allUrls = [
    ...products.map(p => p.emoji),
    ...Object.values(categoryEmojis),
    ...deals.map(d => d.emoji)
  ];
  
  const uniqueUrls = Array.from(new Set(allUrls));
  console.log(`Checking ${uniqueUrls.length} unique URLs...`);
  
  for (const url of uniqueUrls) {
    const result: any = await checkUrl(url);
    if (result.status !== 200 && result.status !== 302) {
      console.log(`Failed: ${url} (Status: ${result.status})`);
    }
  }
  console.log('Done.');
}

run();
