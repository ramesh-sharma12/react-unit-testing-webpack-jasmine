
 'use strict';

var React = require('react');
var {Link} = require('react-router');

var TodoEdit = React.createClass({
 getInitialState: function() {
    return {
	    title: '',
		description:'',
		endDate: ''
    };
  },

  componentWillMount: function() {
    let { id } = this.props.params;
    this.firebaseRef = new Firebase('https://ng2do.firebaseio.com/data/' + id);
    this.firebaseRef.on('value', function(dataSnapshot) {
      var item = dataSnapshot.val();
      this.setState({
        title: item.title
      });
	  this.setState({
		description:item.description
      });
    }.bind(this)); 
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

handleSubmit: function(e) {
    e.preventDefault();
    if (this.state.title) {
		if(this.firebaseRef){
			this.firebaseRef.update({			
						title: this.state.title,
						description: this.state.description
			  });
		}
    }

	window.location.href = '/';

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

module.exports = TodoEdit;
