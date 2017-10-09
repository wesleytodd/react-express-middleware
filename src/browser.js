var React = require('react');
var ReactDOM = require('react-dom');
var setPrototypeOf = require('setprototypeof');

module.exports = function reactExpressMiddlewareGenerator (opts) {
	var options = opts || {};
	options.renderMethod = options.renderMethod || ReactDOM.hydrate || ReactDOM.render;

	// Get the element, defaults to body
	options.element = (function (el) {
		if (typeof el === 'string') {
			return window.document.querySelector(el);
		}
		if (typeof el === 'function') {
			return el();
		}
		if (typeof el !== 'undefined') {
			return el;
		}
		return window.document.getElementById('app');
	})(options.element);

	// Allow for option overrides per-route
	options.mergeOptions = typeof options.mergeOptions === 'function' ? options.mergeOptions : function (req, res) {
		return Object.assign({}, options, res.locals.reactExpressMiddlewareOptions);
	};

	return function reactExpressMiddleware (req, res, next) {
		res.renderReactComponent = function renderReactComponent (Component, store, done) {
			if (typeof store === 'function') {
				done = store;
				store = undefined;
			}

			// Merge the route options
			var opts = options.mergeOptions(req, res);

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
			opts.renderMethod(Component, opts.element, done);
		};
		next();
	};
};
