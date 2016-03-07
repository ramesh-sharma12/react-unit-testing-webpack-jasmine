
'use strict';

var React = require('react');
var {Link} = require('react-router');

var TodoList2 = React.createClass({
  render: function() {
    var _this = this;
    var createItem = function(item, index) {
      return (
        <div key={ index }>
          <span className="col-sm-4"><Link to={`/todo/${item.id}`}> { item.title } </Link> </span>
		  <span className="col-sm-6">{item.description} </span>
          <span className="col-sm-1" onClick={ _this.props.removeItem.bind(null, item.id) }
                style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }}
				title="Click to delete">
            X
          </span>
        </div>
		);
    };
    return ( <div className="todoResults"> 
			   { this.props.items.map(createItem) }
			</div>
			);
		
  }
});

var TodoList = React.createClass({
  getInitialState: function() {
    return {
      items: [],
    };
  },

  componentWillMount: function() {
    this.firebaseRef = new Firebase('https://ng2do.firebaseio.com/data/');
    this.firebaseRef.on('value', function(dataSnapshot) {
      var items = [];
      dataSnapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val(); 
		item.id = childSnapshot.name();       
        items.push(item);
      }.bind(this));

      this.setState({
        items: items
      });
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.firebaseRef.off();
  },

   removeItem: function(key) {
    var firebaseRef = new Firebase('https://ng2do.firebaseio.com/data/');
    firebaseRef.child(key).remove();
  },

  render: function() {
     return (
      <div className="todoList">
	    <div className="header">
			<span className="col-sm-4">  {'Title'} </span>
			<span className="col-sm-6"> {'Description'} </span>
			<span className="col-sm-1">  </span>
		</div>	    
        <TodoList2 items={ this.state.items }  removeItem={ this.removeItem }/>
	 </div>
	);
	}
});

module.exports = TodoList;
