/* global describe, it */
require('babel-register')();

var assert = require('assert');
var shallow = require('enzyme').shallow;

var reactExpressMiddleware = require('../');
var serverRenderMiddleware = require('../lib/index.js').default;
var clientRenderMiddleware = require('../lib/browser.js').default;

var Container = require('./components/Container.js');

describe('React Express Middleware', function () {
	it('should return a function', function () {
		assert.equal(typeof reactExpressMiddleware(), 'function');
	});

	it('should render passed Component (server)', function (done) {
		// 1. Generate middleware with 'shallow' as renderMethod
		var renderMiddleware = serverRenderMiddleware({
			template: 'foo.html',
			renderMethod: function (Component) {
				return shallow(Component).html();
			}
		});

		var res = {
			render: function (path, data) {
				assert.equal(path, 'foo.html');
				assert.equal(data.content, '<div><h1>Basic headline.</h1><p>Basic paragraph.</p></div>');
			}
		};
		// 2. Run middleware (server)
		renderMiddleware({}, res, function () {
		});

		// 3. Call render
		res.renderReactComponent(Container, {});
		done();
	});

	it('should render passed Component (client)', function (done) {
		// 1. Generate middleware with 'shallow' as renderMethod
		var renderMiddleware = clientRenderMiddleware({
			// this is a hack just to test
			element: true,
			renderMethod: function (Component, element) {
				assert.equal(element, true);

				var wrapper = shallow(Component).html();
				assert.equal(wrapper, '<div><h1>Basic headline.</h1><p>Basic paragraph.</p></div>');
				return wrapper;
			}
		});

		var res = {};
		// 2. Run middleware (client)
		renderMiddleware({}, res, function () {
		});

		// 3. Call render
		res.renderReactComponent(Container, {});
		done();
	});
});
