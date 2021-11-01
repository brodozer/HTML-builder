const path = require('path');
const fs = require('fs');
const folder = path.join(__dirname + '/secret-folder');


fs.readdir(folder, (err, files) => {
	files.forEach(file => {
		let filePath = folder + '/' + file;
    	fs.stat(filePath, (err, stats) => {
    		if(stats.isFile()) {
    			let ext = path.extname(filePath);
    			let name = path.basename(filePath, ext);
    			console.log(`${name} - ${ext.slice(1)} - ${stats.size}b`);
    		}
    	});
	})
});
