var React = require('react');
var animationStore = require('../stores/animations');
var animationActions = require('../actions/animations');
var _assign = require('object-assign');

var Animations = React.createClass({
  getInitialState: function() {
    return {
      animations: animationStore.getAnimations(),
      selectedAnimation: animationStore.getSelectedAnimation()
    };
  },

  _updateAnimationStoreState: function() {
    this.setState({
      animations: animationStore.getAnimations(),
      selectedAnimation: animationStore.getSelectedAnimation()
    });
  },

  componentDidMount: function() {
    animationStore.addChangeListener(this._updateAnimationStoreState);
  },

  componentWillUnmount: function() {
    animationStore.removeChangeListener(this._updateAnimationStoreState);
  },

  render: function() {
    var animations = this.state.animations.map(function(animation) {
      var style = {
        backgroundColor: animation === this.state.selectedAnimation ? '#29516d' : undefined
      };
      return <div style={style} onClick={this._handleSelectAnimation.bind(this, animation)}>{animation}</div>;
    }.bind(this));
    var style = _assign({}, this.props.style);
    return (
      <div style={style}>
        <div>Animations <a onClick={this._handleAddAnimation}>+</a></div>
        {animations}
      </div>
    );
  },

  _handleAddAnimation: function() {
    animationActions.addAnimation();
  },

  _handleSelectAnimation: function(animation) {
    animationActions.selectAnimation(animation);
  }
});

module.exports = Animations;
