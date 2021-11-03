const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
	if(input === 'exit') {
		rl.close();
	} else {
		fs.appendFile(path.join(__dirname, 'text.txt'), `${input}\n`, function (err) {
		  if (err) throw err;
		});
	}
}).on('SIGINT', () => {
	rl.close();
}).on('close', () => {
	console.log('Good Buy!');
});

fs.open(path.join(__dirname, 'text.txt'), 'w', (err) => {
    if(err) throw err;
});

console.log('Hello! Type text!');
