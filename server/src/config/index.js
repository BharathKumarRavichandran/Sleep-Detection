const dotenv = require('dotenv');
const path = require('path');


// Declaring globals
const BASE_DIR = __dirname + '/./../../';

dotenv.config(
	{
		path: __dirname + '/./../../.env'
	}
);

module.exports = {
	email: {
		SITE_NOREPLY_EMAIL: process.env.SITE_NOREPLY_EMAIL
	},
	debug: process.env.DEBUG.toLowerCase()=='true' ? true : false,
	maintenance: process.env.MAINTENANCE.toLowerCase()=='true' ? true : false,
	directory: {
		BASE_DIR: BASE_DIR,
        CONFIG_DIR: path.join(BASE_DIR, 'src', 'config'),
        LOGS_DIR: path.join(BASE_DIR, 'storage', 'logs'),
		SRC_DIR: path.join(BASE_DIR, 'src'),
		APP_STATIC_DIR: path.join(BASE_DIR, 'public'),
    },
    files: {
		recipientList : path.join(__dirname, 'recipientList.json')
	},
	environment: process.env.environment,
	key: {
		SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
	},
	ports: {
		APP_PORT: process.env.APP_PORT,
		KUE_PORT: process.env.KUE_PORT
	},
	url: {
		API_BASE_URL: process.env.API_BASE_URL,
	}
};
