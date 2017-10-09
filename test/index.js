/* global describe, it */
var React = require('react');
var assert = require('assert');
var Enzyme = require('enzyme');
var Adapter = require('enzyme-adapter-react-16');
Enzyme.configure({ adapter: new Adapter() });
var shallow = Enzyme.shallow;
var reactExpressMiddleware = require('../');
var serverRenderMiddleware = require('../src/index.js');
var clientRenderMiddleware = require('../src/browser.js');

// A test component
class Container extends React.Component {
	render () {
		return (
			React.createElement('div', null,
				React.createElement('h1', null, 'Basic headline.'),
					React.createElement('p', null, 'Basic paragraph.')
			)
		);
	}
}

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
			locals: {},
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
		var res = {
			locals: {}
		};

		// Run middleware (client)
		renderMiddleware({}, res, function (err) {
			assert(!err);
			assert(typeof res.renderReactComponent === 'function');

			// Call render
			res.renderReactComponent(Container, {}, done);
		});
	});
});
