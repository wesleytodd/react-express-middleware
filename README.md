# React Render Middleware

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![js-happiness-style](https://img.shields.io/badge/code%20style-happiness-brightgreen.svg)](https://github.com/JedWatson/happiness)

This module provides an isomorphic render method for React components in an Express compatible application.

## Usage

```
$ npm install --save react-express-middleware react react-dom
```

**Note:** The module does not specify a react dependency so you can depend on whatever react version you want.  We only require greater than React 0.14.0

`index.html`
```html
<html>
	<head></head>
	<body>
		<div id="app"><%- content %></div>
	</body>
</html>
```

The variable 'content' is provided to your view engine. (Here is an example with EJS. The ([example](example/)) also uses EJS).

There are two ways to use this middleware's render method. The first is to pass a single component, and the second is to pass nested elements or jsx.

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

### Option: Pass nested elements

`index.js`:

```javascript
var router = require('express')();
var reactExpressMiddleware = require('react-express-middleware');

router.use(reactExpressMiddleware({
	element: 'app'
}));
router.get('/', function (req, res) {
	var RenderComponent = (
		<section className="container">
	    <h1>Hi {res.locals.name}</h1>
	  </section>
	);

	res.renderReactComponent(RenderComponent);
});
```

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

// defaults shown
router.use(reactExpressMiddleware({
  element: document.body, // The element on the front-end to render into, can be a selector (string)
  renderMethod: ReactDOM.render, // or ReactDOMServer.renderToString on the server
  template: 'index',  // template passed to express' render
  key: 'content' // the variable exposed to the express template engine with the rendered html string
)}

// *
// Using ‘renderReactComponent’ method.
// *

// single element
res.renderReactComponent(Component <ReactComponentConstructor>[, store <Object>[, done <Function>]])

// nested elements
res.renderReactComponent(Component <ReactComponent>[, done <Function>])
```

## Example

There is no working example in this repo, YET.  But you can see a very simplistic one here for use with nighthawk: https://github.com/wesleytodd/nighthawk/tree/master/example/react

[npm-image]: https://img.shields.io/npm/v/react-express-middleware.svg
[npm-url]: https://npmjs.org/package/react-express-middleware
[downloads-image]: https://img.shields.io/npm/dm/react-express-middleware.svg
[downloads-url]: https://npmjs.org/package/react-express-middleware
