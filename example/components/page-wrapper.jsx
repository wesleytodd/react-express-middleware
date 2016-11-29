var React = require('react');

module.exports = React.createClass({
	displayName: 'PageWrapper',
	render: function () {
		return (
			<div className="page-wrapper">
				<header>
					<h1>Header from {'<PageWrapper>'}</h1>
				</header>
				{this.props.children}
				<footer>
					<h2>Footer from {'<PageWrapper>'}</h2>
				</footer>
			</div>
		);
	}
});
