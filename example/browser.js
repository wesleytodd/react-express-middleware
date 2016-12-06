var router = require('nighthawk')();
var routes = require('./routes');

/* Nighthawk
  -- Front-end router. Provides a feature compatible version of express for the front-end.
  -- https://github.com/wesleytodd/nighthawk
*/
routes(router);
router.use(function (err, req, res, next) {
	console.error(err.stack);
});

router.listen();
