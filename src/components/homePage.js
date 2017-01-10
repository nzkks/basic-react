"use strict";

var React = require('react');

var Home = React.createClass({
  render: function(){
    return (
      <div className="jumbotron">
        <h1>Home page</h1>
        <p>Testing the basic concepts of React Js.</p>
      </div>
    );
  }
});

module.exports = Home;
