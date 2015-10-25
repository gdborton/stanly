require('babel/register');
import actionCreators from '../../src/actions/action-creators';
import {expect} from 'chai';

describe('Action Creators', function() {
  describe('addFile', function() {
    it('should return the expected action.', function() {
      expect(actionCreators.addFile('test', 0)).to.deep.equal({type: 'ADD_FILE', fileName: 'test', id: 0});
    });
  });

  describe('setDurationForFrame', function() {
    it('should return the expected action.', function() {
      expect(actionCreators.setDurationForFrame(0, 600)).to.deep.equal({type: 'SET_DURATION_FOR_FRAME', frame: 0, duration: 600});
    });
  });

  describe('setCanvasHeight', function() {
    it('should return the expected action.', function() {
      expect(actionCreators.setCanvasHeight(600)).to.deep.equal({type: 'SET_CANVAS_HEIGHT', height: 600});
    });

    it('should correctly parse to int', function() {
      expect(actionCreators.setCanvasHeight('600')).to.deep.equal({type: 'SET_CANVAS_HEIGHT', height: 600});
    });
  });

  describe('setCanvasWidth', function() {
    it('should return the expected action.', function() {
      expect(actionCreators.setCanvasWidth(600)).to.deep.equal({type: 'SET_CANVAS_WIDTH', width: 600});
    });

    it('should correctly parse to int', function() {
      expect(actionCreators.setCanvasWidth('600')).to.deep.equal({type: 'SET_CANVAS_WIDTH', width: 600});
    });
  });

  describe('selectFile', function() {
    it('should return the expected action.', function() {
      expect(actionCreators.selectFile(0)).to.deep.equal({type: 'SELECT_FILE', file: 0});
    });
  });

  describe('renameFile', function() {
    it('should return the expected action.', function() {
      expect(actionCreators.renameFile(0, 'test')).to.deep.equal({type: 'RENAME_FILE', file: 0, name: 'test'});
    });
  });
});
