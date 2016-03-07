
'use strict';

var React = require('react');
var {Link} = require('react-router');

var TodoDetails = React.createClass({
	getInitialState: function() {
		return {
		  id: '',
		  title:'',
		  description:''
		};
	},

  componentWillMount: function() {
    let { id } = this.props.params
    this.firebaseRef = new Firebase('https://ng2do.firebaseio.com/data/' + id);
    this.firebaseRef.on('value', function(dataSnapshot) {
      var item = dataSnapshot.val();
      this.setState({
	    id:dataSnapshot.name(),
        title: item.title,
		description:item.description
      });
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.firebaseRef.off();
  },

  render() {
    return (  
        <div className="todoDetails">
			<div className="row header-panel"> 
			   <span className="col-sm-10"> <h3>Task Description </h3> </span>
			   <span className="col-sm-2">
			    <Link className="btn btn-primary" to={`/todo/edit/${this.state.id}`}>{ 'Edit'} </Link> 
				</span>
			</div>
			<div className="content">
				<div> { this.state.title} </div>
				<div> { this.state.description} </div>
			</div>
        </div>
    );
  }
});

module.exports = TodoDetails;
