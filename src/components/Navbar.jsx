
'use strict';

var React = require('react');
var {Link} = require('react-router');

var Navbar = React.createClass({
  render() {
    return (
      <div className="navbar-top">
        <div className="container">
		 <Link className="navbar-brand" to="home">         
            {' Home'}
          </Link>
		   <Link className="navbar-brand" to="todos">         
            {' Todos'}
          </Link>
		  <Link className="navbar-brand" to="aboutUs">         
            {' About Us'}
          </Link>
		<Link className="navbar-brand" to="contactUs">         
            {' Contact Us'}
          </Link>
        </div>
      </div>
    );
  }
});

module.exports = Navbar;
