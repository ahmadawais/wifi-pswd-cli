const welcome = require('cli-welcome');
const checkNode = require('cli-check-node');
const unhandled = require('cli-handle-unhandled');

const pkg = require('./../package.json');

module.exports = ({clear = true}) => {
	unhandled();
	checkNode(`10`);
	welcome({
		title: `wifipass`,
		tagLine: `by Awais.dev`,
		description: pkg.description,
		version: pkg.version,
		bgColor: '#0cbccd',
		color: '#000000',
		bold: true,
		clear
	});
};
