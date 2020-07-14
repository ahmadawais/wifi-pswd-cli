#!/usr/bin/env node

const ora = require('ora');
const spinner = ora({text: ''});
const alert = require('cli-alerts');
const cli = require('./utils/cli.js');
const init = require('./utils/init.js');
const clipboardy = require('clipboardy');
const wifiPassword = require('wifi-password');
const {yellow: y, green: g, red: r, dim: d} = require('chalk');

const input = cli.input;
const flags = cli.flags;
const {clear} = flags;
let pass = false;

(async () => {
	init({clear});
	input.includes('help') && cli.showHelp(0);

	spinner.start(`${y`PASSWORD`} searching…\n`);

	try {
		pass = await wifiPassword(input[0]);
		spinner.stop();
	} catch (error) {
		spinner.warn(`${r`PASSWORD`} search cancelled\n`);
		console.log(error.message);
		console.log();
	}

	if (pass) {
		clipboardy.writeSync(pass);
		spinner.stop();

		alert({
			type: `success`,
			name: `WiFi PASSWORD`,
			msg: pass
		});

		console.log(d`Password copied to the clipboard.\n`);
	}
})();
