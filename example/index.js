var express = require('express');
var ejs = require('consolidate').ejs;
var routes = require('./routes');
var serveStatic = require('serve-static');

// Set up app and templating
var app = express();
app.engine('html', ejs);
app.set('view engine', 'html');
app.set('views', './templates');

// Set up routes
var subApp = express.Router();
routes(subApp);
app.use('/', subApp);

// Serve static assets
app.use('/static', serveStatic('.'));

// Start server
app.listen('1234', function () {
	console.log('Listening on 1234');
});
