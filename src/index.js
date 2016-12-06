var React = require('react');
var ReactDOMServer = require('react-dom/server');
var setPrototypeOf = require('setprototypeof');

export default function reactExpressMiddlewareGenerator (options = {}) {
	options.template = options.template || 'index';
	options.key = options.key || 'content';
	options.renderMethod = options.renderMethod || ReactDOMServer.renderToString;

	return function reactExpressMiddleware (req, res, next) {
		res.renderReactComponent = function renderReactComponent (Component, store, done) {
			if (typeof store === 'function') {
				done = store;
				store = undefined;
			}

			if (!Component.hasOwnProperty('$$typeof')) {
				// store defaults to res.locals
				if (typeof store !== 'object') {
					store = res.locals;

					// Override prototype on res.locals because react
					// uses res.locals.hasOwnProperty and Express specifically
					// uses Object.create(null) which means it doesn't have hasOwnProperty
					setPrototypeOf(store, {});
				}
				// Create factory for component
				Component = React.createFactory(Component)(store);
			}

			// Render template with string
			res.render(options.template, {
				[options.key]: options.renderMethod(Component)
			}, done);
		};
		next();
	};
}
