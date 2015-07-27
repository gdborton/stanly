import React from'react';
import animationStore from'../stores/animations';
import animationActions from'../actions/animations';
import _assign from'object-assign';
import RenameModal from './rename-modal';

var Animations = React.createClass({
  getInitialState() {
    return {
      animations: animationStore.getAnimations(),
      selectedAnimation: animationStore.getSelectedAnimation(),
      renaming: false
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
      return <div style={style} onClick={this._handleSelectAnimation.bind(this, animation)} onDoubleClick={this._handleAnimationDoubleClick}>{animation}</div>;
    });

    var style = _assign({}, this.props.style);
    return (
      <div style={style}>
        <div>Animations <a onClick={this._handleAddAnimation}>+</a></div>
        {animations}
        {this.state.renaming ? <RenameModal value={this.state.selectedAnimation} onChange={this._handleAnimationNameChange}/> : null}
      </div>
    );
  },

  _handleAddAnimation() {
    animationActions.addAnimation();
  },

  _handleAnimationDoubleClick() {
    this.setState({
      renaming: true
    });
  },

  _handleAnimationNameChange(newAnimationName) {
    animationActions.renameAnimation(this.state.selectedAnimation, newAnimationName);
    this.setState({
      renaming: false
    });
  },

  _handleSelectAnimation(animation) {
    animationActions.selectAnimation(animation);
  }
});

export default Animations;
