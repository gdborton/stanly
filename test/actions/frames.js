require('babel/register');
const {expect} = require('chai');
const frameActions = require('../../src/actions/frames');
const editorStore = require('../../src/stores/editor');
const fileActions = require('../../src/actions/files');
const animationActions = require('../../src/actions/animations');
const contextlessActions = require('../../src/actions/contextless');
const {files} = require('../fixtures');

describe('Frame Actions', function() {
  afterEach(function() {
    contextlessActions.resetStores();
  });

  describe('Toggle playing', function() {
    it('should turn playing on if playing is currently off and vice/versa.', function() {
      const animation = 'animation';
      animationActions.addAnimation(animation);
      fileActions.addFile(files[0].name);
      expect(editorStore.getIsPlaying()).to.equal(false);
      frameActions.togglePlaying();
      expect(editorStore.getIsPlaying()).to.equal(true);
      frameActions.togglePlaying();
      expect(editorStore.getIsPlaying()).to.equal(false);
    });
  });
});
