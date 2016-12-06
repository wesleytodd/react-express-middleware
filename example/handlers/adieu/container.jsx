var React = require('react');

module.exports = React.createClass({
	displayName: 'Adieu',
	render: function () {
		return (
			<div>
				<h2>Content Container</h2>
				<p>This route is rendered using nested jsx passed to res.renderReactComponent.</p>
				<p>In this method, any needed props need to be directly passed in to the jsx.</p>
				<p>Adieu, {this.props.name}</p>
			</div>
		);
	}
});
