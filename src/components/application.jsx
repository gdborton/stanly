var React = require('react');
var Files = require('./files');
var Canvas = require('./canvas');

var Application = React.createClass({
  render: function() {
    return (
      <div>
        <Files />
        <Canvas />
      </div>
    );
  }
});

React.render(<Application/>, document.body);

module.exports = Application;
