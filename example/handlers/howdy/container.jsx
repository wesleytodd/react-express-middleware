var React = require('react');

module.exports = React.createClass({
	render: function () {
		return (
			<div>
				<h2>Content Container</h2>
				<p>This route is rendered by passing in a parent container to res.renderReactComponent.</p>
				<p>In this method, whatever is stored on res.locals.context is available by default.</p>
				<p>Howdy. It's a {this.props.adjective} day.</p>
			</div>
		);
	}

});
