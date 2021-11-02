const fs = require('fs');
const path = require('path');
const srcFolder = path.join(__dirname, 'files');
const outFolder = path.join(__dirname, 'files-copy');

const copyDir = () => {
	fs.mkdir(outFolder, { recursive: true }, (err) => {
	    if (err) {
	      return console.error(err);
	    }
	    console.log('Directory created successfully!');
	    fs.readdir(srcFolder, (err, files) => {
			files.forEach(file => {
				fs.copyFile(path.join(srcFolder, file), path.join(outFolder, file), (err) => {
				    if (err) throw err;
				    console.log('copied file ', file);
				});
			})
		});
	});
}

copyDir();