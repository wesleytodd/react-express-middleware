# Express React Render Middleware

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/standard/standard)

This module provides an isomorphic render method for React components in an Express compatible application.

## Usage

```
$ npm install --save react-express-middleware react react-dom
```

**Note:** The module does not specify a react dependency so you can depend on whatever react version you want.  We only require greater than React 0.14.0.

### Setting up your template

On the backend, this middleware builds on top of the existing Express templating engine by providing a local variable with the rendered content (via `ReactDOMServer.renderToString`)
of your react component.  By default, the variable `content` is provided to your view engine. Here is an example with `ejs`, the [example](example/) also uses `ejs`:

```html
<html>
  <head></head>
  <body>
    <div id="app"><%- content %></div>
  </body>
</html>
```

On the frontend the midleware renders the react component into a DOM element, which defaults to the element with an id of `app` (see above), using `ReactDOM.render`.

### Rendering your components

There are two ways to use this middleware's render method. The first is to pass a single component constructor, and the second is to pass nested components or jsx.

#### Option: Pass a single component

```javascript
const router = require('express')()
const reactExpressMiddleware = require('react-express-middleware')
const ReactComponent = require('./component.jsx')

router.use(reactExpressMiddleware({
  element: 'app'
}))
router.get('/', function (req, res) {
  res.renderReactComponent(ReactComponent)
})
```

#### Option: Pass nested elements

```javascript
const router = require('express')()
const reactExpressMiddleware = require('react-express-middleware')

router.use(reactExpressMiddleware({
  element: 'app'
}))
router.get('/', function (req, res) {
  const RenderComponent = (
    <section className="container">
      <h1>Hi {res.locals.name}</h1>
    </section>
  )

  res.renderReactComponent(RenderComponent)
})
```

#### Passing data to your React components

If you are using React then you have probably heard of Flux and Redux.  This module works seamlessly with these architectures because it expects
your application state to be stored in a single object.  This object, often called a `store`, can be passed as the second argument to `renderReactComponent`:

```javascript
router.get('/', function (req, res) {
  // Store some data on res.locals which is provided
  // by Express and a pretty common practice
  res.locals.foo = 'bar'

  // Pass res.locals as your store
  res.renderReactComponent(ReactComponent, res.locals)
})
```

If passing a single container, this middleware will do the above by default, so if you don't pass a store you will automagically get all of the
properties from `res.locals` passed as props to your component.

If you pass nested elements or jsx, you gain flexibility, but lose the 'automagical' convenience described above, and must pass props down directly.

### API Basics

```javascript
// defaults shown
router.use(reactExpressMiddleware({
  element: document.getElementById('app'), // The element on the front-end to render into, can be a selector (string) or function
  renderMethod: ReactDOM.render, // or ReactDOMServer.renderToString on the server
  template: 'index',  // template passed to express' render
  key: 'content' // the variable exposed to the express template engine with the rendered html string
)})

// Overriding options per route
router.get('/', function () {
  res.locals.reactExpressMiddlewareOptions = {
    template: 'other-template'
  }
  // will use the template `other-template.html`
  res.renderReactComponent(Foo)
})

// Using 'renderReactComponent' method.

// single element
res.renderReactComponent(Component <ReactComponentConstructor>[, store <Object>[, done <Function>]])

// nested elements
res.renderReactComponent(Component <ReactComponent>[, done <Function>])
```

## Example App

Run the working example by running `npm run example` from the root of the project.  You can also see a very simplistic example for use [with nighthawk](https://github.com/wesleytodd/nighthawk/tree/master/example/react).

[npm-image]: https://img.shields.io/npm/v/react-express-middleware.svg
[npm-url]: https://npmjs.org/package/react-express-middleware
[downloads-image]: https://img.shields.io/npm/dm/react-express-middleware.svg
[downloads-url]: https://npmjs.org/package/react-express-middleware
