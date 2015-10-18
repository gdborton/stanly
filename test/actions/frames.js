require('babel/register');
const {expect} = require('chai');
const frameActions = require('../../src/actions/frames');
const frameStore = require('../../src/stores/frames');
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
      expect(frameStore.getIsPlaying()).to.equal(false);
      frameActions.togglePlaying();
      expect(frameStore.getIsPlaying()).to.equal(true);
      frameActions.togglePlaying();
      expect(frameStore.getIsPlaying()).to.equal(false);
    });
  });
});
