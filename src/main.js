$ = jQuery = require('jquery');
var React = require('react');
var Header = require('./components/common/header');
var Home = require('./components/homePage');
var About = require('./components/about/aboutPage');

// Globally the 'use strict' directive can't be added because of the jquery variable declaration.
// But the same effect can be achived by adding a Immediately Invoked Function Expression (IIFE) to wrap the underlying scripts and then within this wrapper we can specify the directive.

(function(win){
  "use strict";
  var App = React.createClass({
    render: function(){
      var Child;

      switch(this.props.route){
        case 'about': Child = About; break;
        default: Child = Home;
      }

      return (
        <div>
          <Header/>
          <Child/>
        </div>
      );
    }
  });

  function render(){
    var route = win.location.hash.substr(1);
    React.render(<App route={route} />, document.getElementById('app'));
  }

  win.addEventListener('hashchange', render);
  render();
})(window);
