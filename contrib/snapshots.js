var page = require('webpage').create(),
	system = require('system');

var DELAY_PER_PAGE = 3000,
	KEY = page.event.key['Right'];

if (system.args.length < 3) {
	console.log('Use: snapshots URL output');
	phantom.exit(1);
}

var input = system.args[1],
	output = system.args[2];

console.log('Input:  ' + input);
console.log('Output: ' + output);

page.onError = function(msg){
	console.error("ERROR: " + msg);
	phantom.exit(1);
};

page.onAlert = function(msg){
	console.log("ALERT: " + msg);
};
page.onConsoleMessage = function(msg){
	console.log(msg);
};

page.viewportSize = {width: 1100, height: 850};
page.clipRect = {top: 0, left: 0, width: 1100, height: 850};
page.paperSize = {format: 'Letter', orientation: 'landscape', margin: '0cm'};
page.zoomFactor = 0.53;

page.open(input, function (status) {
	if (status !== 'success') {
		console.log('Can\'t open ' + input);
		phantom.exit(1);
		return;
	}
	console.log('Successfully opened ' + input);
	page.evaluate(function(zoom) {
		document.documentElement.style.zoom = zoom;
	}, page.zoomFactor);
	var seenPages = {}, total = 0;
	window.setTimeout(function renderPage () {
		var currentUrl = page.url;
		if (!seenPages.hasOwnProperty(currentUrl)) {
			seenPages[currentUrl] = ++total;
			console.log('Rendering ' + currentUrl);
			page.render(output + format(total) + '.pdf', {format: 'pdf', quality: 100});
			//page.render(output + format(total) + '.png', {format: 'png', quality: 100});
			page.sendEvent('keypress', KEY);
			window.setTimeout(renderPage, DELAY_PER_PAGE);
		} else {
			console.log('Done: ' + total + ' pages');
			page.close();
			phantom.exit();
		}
	}, DELAY_PER_PAGE);
});

var zeroes = '0000';
function format (number, width) {
	if (isNaN(width)) {
		width = 4;
	}
	var n = number.toString(),
		reminder = width - n.length;
	if (reminder > 0) {
		for (; reminder > zeroes.length; reminder -= zeroes.length) {
			n = zeroes + n;
		}
		if (reminder) {
			n = zeroes.substring(0, reminder) + n;
		}
	}
	return n;
}
