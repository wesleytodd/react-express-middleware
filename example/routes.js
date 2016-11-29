/* Context + isomorphic rendering */
var sharedContext = require('shared-context');
var reactExpressMiddleware = require('../');

/* View handlers */
var howdy = require('./handlers/howdy');
var adieu = require('./handlers/adieu/index.jsx');

module.exports = function (app) {
	app.use(reactExpressMiddleware({
		element: 'app-container'
	}), sharedContext());

	app.get('/', function (req, res) {
		res.redirect('/howdy');
	});
	app.get('/howdy', howdy);
	app.get('/adieu', adieu);
};
