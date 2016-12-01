/* global describe, it */
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
		// 1. Generate middleware with 'shallow' as serverRenderMethod
		var renderMiddleware = serverRenderMiddleware({
			template: 'foo.html',
			serverRenderMethod: function (Component) {
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
		// 1. Generate middleware with 'shallow' as clientRenderMethod
		var renderMiddleware = clientRenderMiddleware({
			clientRenderMethod: function (Component, element) {
				assert.equal(element, window.document.body);

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
