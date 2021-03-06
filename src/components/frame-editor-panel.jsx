import React from 'react';
import globalStyles from '../global-styles';

var styles = {
  container: {
    backgroundColor: globalStyles.colors.outsidePanelBackground,
    width: 200,
    padding: globalStyles.sizes.containerPadding,
    boxSizing: 'border-box'
  },
  frameSettings: {
    marginTop: 50
  }
};

var FrameEditorPanel = React.createClass({
  getDefaultProps() {
    return {
      events: []
    }
  },

  render() {
    let events = this.props.events.map((event, index) => {
      return (
        <div key={index}>
          {event}
          <button onClick={this.handleDeleteEvent.bind(this, event)}>Delete</button>
        </div>
      );
    });

    return (
      <div style={styles.container}>
        <div>{this.props.fileName ? this.props.fileName + '\'s' : ''} settings</div>
        top: <input value={this.props.top} onChange={this._handleTopChange} />
        left: <input value={this.props.left} onChange={this._handleLeftChange} />
        Rotation: <input value={this.props.rotation} onChange={this._handleRotationChange} />
        Visible: <input type="checkbox" checked={this.props.visible} onChange={this._handleToggleVisibility} />
        <div style={styles.frameSettings}>
          Frame Settings
          <div>
            Duration: <input value={this.props.duration} onChange={this._handleDurationChange} />
            Events:
            <div>
              {events}
            </div>
            <input ref='newEvent' placeholder='Event'/>
            <button onClick={this.handleAddEvent}>Add</button>
          </div>
        </div>
      </div>
    );
  },

  _handleTopChange(event) {
    this.props.onChangeTop(event.target.value);
  },

  _handleLeftChange(event) {
    this.props.onChangeLeft(event.target.value);
  },

  _handleRotationChange(event) {
    this.props.onChangeRotation(event.target.value);
  },

  _handleToggleVisibility(event) {
    this.props.onChangeVisibility(!this.props.visible);
  },

  _handleDurationChange(event) {
    this.props.onChangeDuration(event.target.value);
  },

  handleAddEvent() {
    let value =  this.refs.newEvent.value.trim();
    if (value) {
      this.props.onAddEvent(value);
      this.refs.newEvent.value = '';
    }
  },

  handleDeleteEvent(event) {
    this.props.onDeleteEvent(event);
  }
});

export default FrameEditorPanel;
