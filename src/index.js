var React = require('react');
var ReactDOMServer = require('react-dom/server');
var setPrototypeOf = require('setprototypeof');

export default function reactExpressMiddlewareGenerator (options = {}) {
	options.template = options.template || 'index';
	options.key = options.key || 'content';

	return function reactExpressMiddleware (req, res, next) {
		res.renderReactComponent = function renderReactComponent (Component, store, done) {
			//
			// Option 1: Store passed in, Component is a function
			//
			if (arguments.length > 1) {
				// store defaults to res.locals
				if (typeof store === 'function') {
					done = store;
					store = undefined;
				}
				if (typeof store !== 'object') {
					store = res.locals;

					// Override prototype on res.locals because react
					// uses res.locals.hasOwnProperty and Express specefically
					// uses Object.create(null) which means it doesn't have hasOwnProperty
					setPrototypeOf(store, {});
				}

				// Create factory for component
				Component = React.createFactory(Component);

				// Render template with string
				res.render(options.template, {
					[options.key]: ReactDOMServer.renderToString(Component(store))
				}, done);
			} else {
				//
				// Option 2: Store is not passed in, Component is JSX (with required props passed)
				//
				res.render(options.template, {
					[options.key]: ReactDOMServer.renderToString(Component)
				}, done);
			}
		};
		next();
	};
}
