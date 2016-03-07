
'use strict';

var React = require('react');
var {Routes, Route} = require('react-router');

// Export React so the dev tools can find it
(window !== window.top ? window.top : window).React = React;

React.renderComponent(
  <Routes location="history">
    <Route name="app" path="/" handler={require('./layouts/Default.jsx')}>
      <Route name="home" path="/" handler={require('./pages/Home.jsx')} />      
	  <Route name="todos" handler={require('./pages/Todos.jsx')} />
	  <Route name="details" path="/todo/:id" handler={require('./components/todo/Details.jsx')} />	 
	  <Route name="edit" path="/todo/edit/:id" handler={require('./components/todo/Edit.jsx')} />	 
	  <Route name="aboutUs" handler={require('./pages/AboutUs.jsx')} />
	  <Route name="contactUs" handler={require('./pages/ContactUs.jsx')} />
	  <Route path="*" handler={require('./pages/Error.jsx')}/>
    </Route>
  </Routes>,
   document.body
);
