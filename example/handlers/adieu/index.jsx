var React = require('react');
var PageWrapper = require('../../components/page-wrapper.jsx');
var Container = require('./container.jsx');

module.exports = function adieuHandler (req, res) {
	var RenderComponent = (
		<PageWrapper>
			<Container name="Lorelai" />
		</PageWrapper>
	);

	res.renderReactComponent(RenderComponent);
};
