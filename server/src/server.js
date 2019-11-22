// Importing packages/modules
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const expressValidator = require('express-validator');
const logger = require('./config/winston');
const morgan = require('morgan');
const sgMail = require('@sendgrid/mail');
const signale = require('signale');

// Importing configuration file
const config = require('./config/index');

//Importing routes
const routes = require('./routes/index.router');

// env/config variables
const APP_PORT = config.ports.APP_PORT || 3000;

// Adding options for CORS middleware
const corsOptions = {
	origin: config.url.CLIENT_BASE_URL,
	methods: ['GET', 'PUT', 'POST', 'DELETE'],
	credentials: true
};

// Initialising express
const app = express();
const router = express.Router();

// Initialize body-parser middleware
app.use(bodyParser.json(), cors(corsOptions));
app.use(bodyParser.urlencoded({
	extended: true
}));

// Initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

// Configure loggers
app.use(morgan('combined', { stream: logger.stream }));

// Set Sendgrid API key
sgMail.setApiKey(config.key.SENDGRID_API_KEY);

app.use(routes);

app.get('/', (req, res) => {
	return res.send('What are you doing here? :p');
});

// Route error handler
app.use( (err, req, res, next) => {
	// Log errors
	logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
});

app.all('*', (req, res) => {
	signale.error('Returning a 404 from the catch-all route');
	return res.sendStatus(404);
});

app.listen(APP_PORT, () => {
    signale.success(`App server listening on port: ${APP_PORT}`);
});