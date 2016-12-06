var Container = require('./container.jsx');

module.exports = function howdyHandler (req, res) {
	res.locals.context.example = true;
	res.locals.context.sampleData = {
		hi: 'hello',
		goodbye: 'sad'
	};
	res.locals.adjective = 'baffling';

	res.renderReactComponent(Container);
};
