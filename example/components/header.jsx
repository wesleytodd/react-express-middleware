var React = require('react');

module.exports = React.createClass({
	displayName: 'Header',
	render: function () {
		return (
			<div className="page-wrapper">
				<header>
					<h1>Header from {'<Header>'}</h1>
				</header>
				{this.props.children}
				<footer>
					<h2>Footer from {'<Header>'}</h2>
				</footer>
			</div>
		);
	}
});
