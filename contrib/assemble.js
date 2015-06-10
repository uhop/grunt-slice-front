var fs = require('fs'),
	cp = require('child_process');


var files = fs.readdirSync('.').filter(function (name) {
			return /\.pdf$/i.test(name);
		}).sort(function (a, b) {
			if (a < b) return -1;
			return a > b ? 1 : 0;
		});

console.log('Bursting ' + files.length + ' PDF files...');

files.forEach(function (name) {
	cp.execSync('pdftk ' + name + ' burst');
	fs.renameSync('pg_0001.pdf', name);
});

console.log('Concatenating ' + files.length + ' PDF files...');

cp.execSync('pdftk ' + files.join(' ') + ' cat output output.pdf compress');

console.log('Done');