#!/usr/bin/env node

const ora = require('ora');
const spinner = ora({text: ''});
const alert = require('cli-alerts');
const cli = require('./utils/cli.js');
const init = require('./utils/init.js');
const clipboardy = require('clipboardy');
const wifiPassword = require('wifi-password');
const {yellow: y, green: g, dim: d} = require('chalk');

const [ssid] = cli.input;
const flags = cli.flags;
const {clear} = flags;
let pass = false;

const failed = () =>
	alert({
		type: `fail`,
		msg: `Password retrieval failed`
	});

(async () => {
	init({clear});
	spinner.start(`${y`PASSWORD`} searching…`);

	// Get the password.
	try {
		pass = await wifiPassword(ssid);
	} catch (error) {
		spinner.clear();
		failed();
	}

	if (pass) {
		// Copy to clipboard.
		clipboardy.writeSync(pass);
		spinner.clear();

		alert({
			type: `success`,
			name: `WiFi PASSWORD`,
			msg: pass
		});

		console.log(d`Password copied to clipboard.\n`);
	} else {
		spinner.clear();
		failed();
	}
})();
