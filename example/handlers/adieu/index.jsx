var React = require('react');
var Header = require('../../components/header.jsx');
var Container = require('./container.jsx');

module.exports = function adieuHandler (req, res) {
	var RenderComponent = (
		<Header>
			<Container name="Lorelai" />
		</Header>
	);

	res.renderReactComponent(RenderComponent);
};
