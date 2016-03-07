/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var TodoList = require('../components/todo/List.jsx');
var TodoCreate = require('../components/todo/Create.jsx');

var TodosPage = React.createClass({
  render() {
    return (
      <div className="container">
	   <TodoCreate />
       <TodoList />
      </div>
    );
  }
});

module.exports = TodosPage;
