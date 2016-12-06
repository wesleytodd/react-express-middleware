/* global describe, it */
var React = require('react');
var assert = require('assert');
var shallow = require('enzyme').shallow;
var reactExpressMiddleware = require('../');
var serverRenderMiddleware = require('../lib/index.js').default;
var clientRenderMiddleware = require('../lib/browser.js').default;

// A test component
var Container = React.createClass({
	displayName: 'Container',
	render: function () {
		return (
			<div>
				<h1>Basic headline.</h1>
				<p>Basic paragraph.</p>
			</div>
		);
	}
});

describe('React Express Middleware', function () {
	it('should return a function', function () {
		assert.equal(typeof reactExpressMiddleware(), 'function');
	});

	it('should render passed Component (server)', function (done) {
		// Generate middleware with 'shallow' as renderMethod
		var renderMiddleware = serverRenderMiddleware({
			template: 'foo.html',
			renderMethod: function (Component) {
				return shallow(Component).html();
			}
		});

		// Create response
		var res = {
			render: function (path, data, doneRender) {
				assert.equal(path, 'foo.html');
				assert.equal(data.content, '<div><h1>Basic headline.</h1><p>Basic paragraph.</p></div>');
				doneRender();
			}
		};

		// Run middleware (server)
		renderMiddleware({}, res, function (err) {
			assert(!err);
			assert(typeof res.renderReactComponent === 'function');

			// Call render
			res.renderReactComponent(Container, {}, done);
		});
	});

	it('should render passed Component (client)', function (done) {
		// Generate middleware with 'shallow' as renderMethod
		var renderMiddleware = clientRenderMiddleware({
			// this is a hack just to test
			element: true,
			renderMethod: function (Component, element, done) {
				assert.equal(element, true);

				var wrapper = shallow(Component).html();
				assert.equal(wrapper, '<div><h1>Basic headline.</h1><p>Basic paragraph.</p></div>');
				setTimeout(done);
				return wrapper;
			}
		});

		// Create response
		var res = {};

		// Run middleware (client)
		renderMiddleware({}, res, function (err) {
			assert(!err);
			assert(typeof res.renderReactComponent === 'function');

			// Call render
			res.renderReactComponent(Container, {}, done);
		});
	});
});
