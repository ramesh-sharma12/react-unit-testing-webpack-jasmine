/**
* @jsx React.DOM
*/

'use strict';

var React = require('react');
var TodoList = require('../components/todo/List.jsx');
var TodoCreate = require('../components/todo/Create.jsx');

var ErrorPage = React.createClass({
  render() {
    return (
          <div className="container">
           Page not Found.
          </div>
    );
  }
});

module.exports = ErrorPage;
