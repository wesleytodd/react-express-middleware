var React = require('react');
var ReactDOM = require('react-dom');
var setPrototypeOf = require('setprototypeof');

export default function reactExpressMiddlewareGenerator (options = {}) {
	// Get the element, defaults to body
	options.element = (function (el) {
		if (typeof el === 'string') {
			return window.document.getElementById(el);
		}
		if (typeof el === 'function') {
			return el();
		}
		if (typeof el !== 'undefined') {
			return el;
		}
		return window.document.body;
	})(options.element);

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
				ReactDOM.render(Component(store), options.element, done);
			} else {
				//
				// Option 2: Store is not passed in, Component is JSX (with required props passed)
				//
				ReactDOM.render(Component, options.element, done);
			}
		};
		next();
	};
}
