/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var TodoList = require('../components/todo/List.jsx');

var HomePage = React.createClass({
  render() {
    return (
      <div className="container">
		<div> <h3> Upcoming Tasks. </h3></div>					
          <TodoList />		
      </div>

    );
  }
});

module.exports = HomePage;
