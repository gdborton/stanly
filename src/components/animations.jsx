import React from'react';
import animationStore from'../stores/animations';
import animationActions from'../actions/animations';
import _assign from'object-assign';

var Animations = React.createClass({
  getInitialState() {
    return {
      animations: animationStore.getAnimations(),
      selectedAnimation: animationStore.getSelectedAnimation()
    };
  },

  _updateAnimationStoreState() {
    this.setState({
      animations: animationStore.getAnimations(),
      selectedAnimation: animationStore.getSelectedAnimation()
    });
  },

  componentDidMount() {
    animationStore.addChangeListener(this._updateAnimationStoreState);
  },

  componentWillUnmount() {
    animationStore.removeChangeListener(this._updateAnimationStoreState);
  },

  render() {
    var animations = this.state.animations.map((animation) => {
      var style = {
        backgroundColor: animation === this.state.selectedAnimation ? '#29516d' : undefined
      };
      return <div style={style} onClick={this._handleSelectAnimation.bind(this, animation)}>{animation}</div>;
    });

    var style = _assign({}, this.props.style);
    return (
      <div style={style}>
        <div>Animations <a onClick={this._handleAddAnimation}>+</a></div>
        {animations}
      </div>
    );
  },

  _handleAddAnimation() {
    animationActions.addAnimation();
  },

  _handleSelectAnimation(animation) {
    animationActions.selectAnimation(animation);
  }
});

export default Animations;
