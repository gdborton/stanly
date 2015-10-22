import React from'react';
import editorStore from'../stores/editor';
import animationActions from'../actions/animations';
import _assign from'object-assign';
import renameModalActions from '../actions/rename-modal';
import ContextMenu from './context-menu';
import contextMenuActions from '../actions/context-menu';

var Animations = React.createClass({
  getInitialState() {
    return {
      animations: editorStore.getAnimations(),
      selectedAnimation: editorStore.getSelectedAnimation(),
      contextMenuOpen: false
    };
  },

  _updateAnimations() {
    this.setState({
      animations: editorStore.getAnimations(),
      selectedAnimation: editorStore.getSelectedAnimation(),
    });
  },

  componentDidMount() {
    editorStore.addChangeListener(this._updateAnimations);
  },

  componentWillUnmount() {
    editorStore.removeChangeListener(this._updateAnimations);
  },

  render() {
    var animations = this.state.animations.map(animation => {
      var style = {
        backgroundColor: animation === this.state.selectedAnimation ? '#29516d' : undefined
      };

      return <div style={style} onClick={this._handleSelectAnimation.bind(this, animation)} key={animation} onContextMenu={this._handleContextMenu.bind(this, animation)}>{animation}</div>;
    });

    var style = _assign({}, this.props.style);
    return (
      <div style={style}>
        <div>Animations <a onClick={this._handleAddAnimation}>+</a></div>
        {animations}
        <ContextMenu/>
      </div>
    );
  },

  _handleAddAnimation() {
    animationActions.addAnimation();
  },

  _handleSelectAnimation(animation) {
    animationActions.selectAnimation(animation);
  },

  _handleContextMenu(animation, event) {
    contextMenuActions.openContextMenu([
      {
        display: 'Rename',
        onClick: () => {
          renameModalActions.open(this.state.selectedAnimation, (newValue) => {
            animationActions.renameAnimation(this.state.selectedAnimation, newValue);
          });
        }
      }, {
        display: 'Delete',
        onClick: () => {
          animationActions.deleteAnimation(this.state.selectedAnimation);
        }
      }
    ], event);
  }
});

export default Animations;
