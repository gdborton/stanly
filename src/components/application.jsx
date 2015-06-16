var React = require('react');
var Files = require('./files');
var Canvas = require('./canvas');
var FrameEditor = require('./frame-editor');

var Application = React.createClass({
  render: function() {
    return (
      <div>
        <Files />
        <Canvas />
        <FrameEditor />
      </div>
    );
  }
});

React.render(<Application/>, document.body);

module.exports = Application;
