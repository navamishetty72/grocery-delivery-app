const https = require('https');
const fs = require('fs');

const { products, categoryEmojis, deals } = require('./src/data/products.ts'.replace('.ts', '.js')); // We can't directly require .ts without compilation
