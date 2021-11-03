
const fs = require('fs').promises;
const path = require('path');

const dest = path.join(__dirname, 'project-dist');

async function copyDir(src, dest) {
    const entries = await fs.readdir(src, {withFileTypes:true});
    await fs.mkdir(dest);
    for(let entry of entries) {
        const srcPath =  path.join(src, entry.name);
        const destPath =  path.join(dest, entry.name);
        if(entry.isDirectory()) {
            await copyDir(srcPath, destPath);
        } else {
            await fs.copyFile(srcPath, destPath);
        }
    }
}

async function mergeStyles (src, dest) {
	let files = await fs.readdir(src, {withFileTypes: true});
	let css = [];
	files = files.filter(file => file.isFile() && path.extname(path.join(src, file.name)) == '.css').map(file => fs.readFile(path.join(src, file.name)));
	await Promise.all(files).then(styles => styles.forEach(style => {
		css.push(style.toString());
	}));
	fs.writeFile(path.join(dest, 'style.css'), css.join('\n'), (err) => {
	    if(err) throw err;
	});
}

async function buildHtml (components, dest) {
	let tmp = await fs.readFile(path.join(__dirname, 'template.html'), 'utf-8');
	let tags = tmp.match(/{{.+}}/gm);
	for(let i = 0; i < tags.length; i++) {
		let data = await fs.readFile(path.join(components, `${tags[i].replace(/[{}]/g, '')}.html`), 'utf-8');
		tmp = tmp.replace(tags[i], data);
	}
	fs.writeFile(path.join(dest, 'index.html'), tmp, (err) => {
	    if(err) throw err;
	});
}

async function build (dest) {
	try {
    	await fs.rm(dest, { recursive: true});
	} catch (error) {
		console.log('Folder not found, error code - ', error.code);
	}
	await fs.mkdir(dest);
	buildHtml(path.join(__dirname, 'components'), dest);
	mergeStyles(path.join(__dirname, 'styles'), dest);
	copyDir(path.join(__dirname, 'assets'), path.join(dest, 'assets'))
}

build(dest);