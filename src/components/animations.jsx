import React from'react';
import _assign from'object-assign';
import renameModalActions from '../actions/rename-modal';
import ContextMenu from './context-menu';
import contextMenuActions from '../actions/context-menu';

var Animations = React.createClass({
  getDefaultProps() {
    return {
      animations: []
    }
  },
  render() {

    var animations = this.props.animations.map(animation => {
      var style = {
        backgroundColor: animation.id === this.props.selectedAnimationId ? '#29516d' : undefined
      };

      return <div style={style} onClick={this._handleSelectAnimation.bind(this, animation)} key={animation.id} onContextMenu={this._handleContextMenu.bind(this, animation)}>{animation.name}</div>;
    });

    var style = {...this.props.style};
    return (
      <div style={style}>
        <div>Animations <a onClick={this._handleAddAnimation}>+</a></div>
        {animations}
        <ContextMenu/>
      </div>
    );
  },

  _handleAddAnimation() {
    this.props.onAddAnimation();
  },

  _handleSelectAnimation(animation) {
    this.props.onSelectAnimation(animation);
  },

  _handleContextMenu(animation, event) {
    this.props.onSelectAnimation(animation);
    contextMenuActions.openContextMenu([
      {
        display: 'Rename',
        onClick: () => {
          renameModalActions.open(animation.name, (newValue) => {
            this.props.onRenameAnimation(animation, newValue);
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
