const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

const srcFolder = path.join(__dirname, 'files');
const outFolder = path.join(__dirname, 'files-copy');

const copyDir = async () => {
	try {
		await fsPromises.rm(outFolder, { recursive: true });
	} catch (error) {
		console.log('Folder not found, error' , error.code);
	}
	fs.mkdir(outFolder, { recursive: true }, (err) => {
	    if (err) {
	      return console.error(err);
	    }
	    fs.readdir(srcFolder, (err, files) => {
			files.forEach(file => {
				fs.copyFile(path.join(srcFolder, file), path.join(outFolder, file), (err) => {
				    if (err) throw err;
				});
			})
		});
	});
}

copyDir();