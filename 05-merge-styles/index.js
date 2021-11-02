const path = require('path');
const fs = require('fs').promises;
const srcFolder = path.join(__dirname, 'styles');
const outFolder = path.join(__dirname, 'project-dist');
const css = [];

const build = async (folder) => {
	let files = await fs.readdir(folder, {withFileTypes: true});
	files = files.filter(file => file.isFile() && path.extname(path.join(folder, file.name)) == '.css').map(file => fs.readFile(path.join(folder, file.name)));
	await Promise.all(files).then(styles => styles.forEach(style => {
		css.push(style.toString());
	}));
	fs.writeFile(path.join(outFolder, 'bundle.css'), css.join('\n'), (err) => {
	    if(err) throw err;
	});
}

build(srcFolder);


