import React from 'react';
import editorStore from '../stores/editor';
import _assign from 'object-assign';

var Canvas = React.createClass({
  render() {
    var style = {
      canvas: {
        position: 'relative',
        border: '1px solid black',
        overflow: 'hidden',
        height: this.props.height,
        width: this.props.width,
        background: 'URL(assets/img/transparent-bg.png)',
        margin: '200px auto'
      },

      container: {

      },

      image: {
        position: 'absolute'
      }
    };
    var images = [];
    if (this.props.frame) {
      images = this.props.frame.fileFrames.map((fileFrame, index) => {
        if (fileFrame && fileFrame.visible) {
          var imageStyle = _assign({}, style.image, {
            top: fileFrame.top,
            left: fileFrame.left,
            transform: 'rotate(' + fileFrame.rotation + 'deg)'
          });

          return <img style={imageStyle} key={fileFrame.file} src={process.cwd() + '/' + fileFrame.file}/>
        } else {
          return null;
        }
      });
    }

    return (
      <div style={style.container}>
        <div style={style.canvas}>
          {images}
        </div>
      </div>
    );
  }
});

export default Canvas;
