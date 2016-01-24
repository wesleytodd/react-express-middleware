var React = require('react');
var ReactDOMServer = require('react-dom/server');

export default function reactExpressMiddlewareGenerator (options = {}) {
	options.template = options.template || 'index';
	options.key = options.key || 'content';

	return function reactExpressMiddleware (req, res, next) {
		res.renderReactComponent = function renderReactComponent (Component, store, done) {
			// store defaults to res.locals
			if (typeof store === 'function') {
				done = store;
			}
			if (typeof store !== 'object') {
				store = res.locals;
			}

			// Create factory for component
			Component = React.createFactory(Component);

			// Render template with string
			res.render(options.template, {
				[options.key]: ReactDOMServer.renderToString(Component(...store))
			}, done);
		};
		next();
	};
};
