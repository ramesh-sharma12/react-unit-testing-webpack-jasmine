'use strict';
var React = require('react/addons');
var DefaultLayout = require('../../src/layouts/Default.jsx');
var Navbar = require('../../src/components/Navbar.jsx');
var TestUtils  = React.addons.TestUtils;

describe('DefaultLayout', () => {
  var component;

  beforeEach(() => {   
    component = new DefaultLayout();
  });

  it('should create a new instance of DefaultLayout', () => {
    expect(component).toBeDefined();
  });

  it('should have Navbar', () => {
      debugger;
       var navBar = TestUtils.renderIntoDocument(
            <Navbar />
        );

        expect(navBar).toExist();
  });
});
