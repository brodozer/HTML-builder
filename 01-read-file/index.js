const path = require('path');
const fs = require('fs');

let stream = fs.createReadStream(path.join(__dirname, "text.txt"))

stream.on('data', (data) => console.log(data.toString()));


