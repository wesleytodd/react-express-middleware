# React Render Middleware

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![js-happiness-style](https://img.shields.io/badge/code%20style-happiness-brightgreen.svg)](https://github.com/JedWatson/happiness)

This module provides an isomorphic render method for React components in an Express compatible application.

## Usage

```
$ npm install --save react-express-middleware react react-dom
```

`index.html`
```html
<html>
	<head></head>
	<body>
		<div id="app"><%- content %></div>
	</body>
</html>
```

### Option: Pass a single component

`index.js`:

```javascript
// The [router](https://www.npmjs.com/package/router) package is the new
// standalone router used in Express 5.0. This example uses express directly,
// but there is also a compatible browser module which wraps `router` called
// [nighthawk](https://www.npmjs.com/package/nighthawk) which can be a drop
// in replacement on the client side.  Either of these require lines will
// work with the middleware.  If you a clever, you can even make this example
// function in both the browser and server via browserify :)
// var router = require('nighthawk')();
var router = require('express')();
var reactExpressMiddleware = require('react-express-middleware');
var ReactComponent = require('./component.jsx');

router.use(reactExpressMiddleware({
	element: 'app'
}));
router.get('/', function (req, res) {
	res.renderReactComponent(ReactComponent);
});
```

### Option: Pass jsx

`index.js`:

```javascript
var router = require('express')();
var reactExpressMiddleware = require('react-express-middleware');
var PageWrapper = require('./page-wrapper.jsx');
var Container = require('./container.jsx');

router.use(reactExpressMiddleware({
	element: 'app'
}));
router.get('/', function (req, res) {
	var RenderComponent = (
		<PageWrapper>
			<Container name={res.locals.name} />
			// <Container name="Lorelai" />
		</PageWrapper>
	);

	res.renderReactComponent(RenderComponent);
});
```

**Note:** The module does not specify a react dependency so you can depend on whatever react version you want.  We only require greater than React 0.14.0

## Passing data to your React components

If you are using React then you have probably heard of Flux and Redux.  This module works seamlessly with these architectures because it expects your application state to be stored in a single object.  This object, often called a `store`, can be passed as the second argument to `renderReactComponent`:

```javascript
router.get('/', function (req, res) {
	// Store some data on res.locals which is provided
	// by express and a pretty common practice
	res.locals.foo = 'bar';

	// Pass res.locals as your store
	res.renderReactComponent(ReactComponent, res.locals);
});
```

If passing a single container, this middleware will do the above by default, so if you don't pass a store you will automagically get all of the properties from `res.locals` passed as props to your component.

If you pass jsx, you gain flexibility, but lose the 'automagical' convenience described above, and must pass props down directly.

### Options

```javascript
// *
// Generating middleware with config options
// *
router.use(reactExpressMiddleware({
	 // [ Options and their defaults ]
	 // -- Client
		 // element: (defaults to ‘body’)
		 // clientRenderMethod: (defaults to ReactDOM.render)
	 // -- Server
		 // template: (defaults to ‘index’)
		 // key: (defaults to ‘context’)
		 // serverRenderMethod: (defaults to ReactDOMServer.renderToString)
})

// *
// Using ‘renderReactComponent’ method.
// *
res.renderReactComponent(Component, store, done)
	// [ Using a single container ]
	// -- Component: A single React component
	// -- store: Optional data object. If none passed, defaults to res.locals
	// -- done: Optional callback

res.renderReactComponent(JSX, done)
	// [ Passing jsx ]
	// -- JSX, including props passed directly
	// -- done: Optional callback
```

## Example

There is no working example in this repo, YET.  But you can see a very simplistic one here for use with nighthawk: https://github.com/wesleytodd/nighthawk/tree/master/example/react

[npm-image]: https://img.shields.io/npm/v/react-express-middleware.svg
[npm-url]: https://npmjs.org/package/react-express-middleware
[downloads-image]: https://img.shields.io/npm/dm/react-express-middleware.svg
[downloads-url]: https://npmjs.org/package/react-express-middleware
