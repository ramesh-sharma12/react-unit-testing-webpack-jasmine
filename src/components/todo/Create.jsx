
 'use strict';

var React = require('react');
var {Link} = require('react-router');

var TodoCreate = React.createClass({
  getInitialState: function() {
    return {
	    title: '',
		description:'',
		endDate: ''
    };
  },

  componentWillMount: function() {
    this.firebaseRef = new Firebase('https://ng2do.firebaseio.com/data/');   
  },

  componentWillUnmount: function() {
    this.firebaseRef.off();
  },

  onTitleChange: function(e) {
    this.setState({
	    title: e.target.value
	});
  },

  onDescriptionChange: function(e) {
    this.setState({
	    description: e.target.value
	});
  },

  handleDateChange: function(date) {
    this.setState({
      startDate: date
    });
  },

  removeItem: function(key) {
    var firebaseRef = new Firebase('https://ng2do.firebaseio.com/data/');
    firebaseRef.child(key).remove();
  },

  handleSubmit: function(e) {
    e.preventDefault();
    if (this.state.title) {
      this.firebaseRef.push({			
				title: this.state.title,
				description: this.state.description
	  });

      this.setState({			
				title: '',
				description:''
	  });
    }
  },

  render: function() {
    return (
      <div className="todoEdit">        
        <form className="form-group" onSubmit={ this.handleSubmit }>
			<div>
				<input className="form-control" onChange={ this.onTitleChange } value={ this.state.title } placeholder="Add title" />
		    </div>
			<div>  
				<textarea className="form-control"  onChange={ this.onDescriptionChange } value={ this.state.description } placeholder="Add Description"/>
			</div> 
             <button className="btn btn-primary" >{ 'Save'}</button>
        </form>
      </div>
    );
  }
});

module.exports = TodoCreate;
