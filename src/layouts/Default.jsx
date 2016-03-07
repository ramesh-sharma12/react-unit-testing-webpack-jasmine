
'use strict';

var React = require('react');
var {Link} = require('react-router');
var Navbar = require('../components/Navbar.jsx');

var DefaultLayout = React.createClass({
  render() {
    return (
      <div>
        <Navbar />    
		<div className="contents">
			<div className="container">
				<this.props.activeRouteHandler />
			 </div>
		</div> 
        <div className="navbar-footer">
          <div className="container">
            footer....
          </div>
        </div>
      </div>
    );
  }
});

module.exports = DefaultLayout;
