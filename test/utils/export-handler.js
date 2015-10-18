require('babel/register');

const fileActions = require('../../src/actions/files');
const animationActions = require('../../src/actions/animations');
const canvasActions = require('../../src/actions/canvas');
const frameActions = require('../../src/actions/frames');
const {expect} = require('chai');
const {files, defaultFileFrameValue} = require('../fixtures');
const contextlessActions = require('../../src/actions/contextless');
const exportHandler = require('../../src/utils/export-handler');
const editorStore = require('../../src/stores/editor');

describe('Export Handler', function() {
  afterEach(function() {
    contextlessActions.resetStores();
  });

  describe('default export', function() {
    it('should have a default export object.', function() {
      const exportObject = exportHandler.buildExportObject();
      expect(exportObject.width).to.equal(300);
      expect(exportObject.height).to.equal(300);
      expect(exportObject.files).to.be.empty;
      expect(exportObject.animations).to.be.empty;
    });
  });

  describe('manipulating data', function() {
    it('should add a file to the export if one is added via the action creator.', function() {
      fileActions.addFile(files[0].name, files[0].path);
      const exportObject = exportHandler.buildExportObject();
      expect(exportObject.files.length).to.equal(1);
      expect(exportObject.files).to.include(files[0].name);
    });

    it('should add an animation to the export if one is added via the action creator.', function() {
      let animationName = 'animation';
      animationActions.addAnimation(animationName);
      const exportObject = exportHandler.buildExportObject();
      expect(Object.keys(exportObject.animations).length).to.equal(1);
      expect(exportObject.animations).to.include.keys(animationName);
    });

    // file added first.
    it('should add a file to all animations when one is added after an animation.', function() {
      let animationName = 'animation';
      animationActions.addAnimation(animationName);
      fileActions.addFile(files[0].name, files[0].path);
      const exportObject = exportHandler.buildExportObject();
      var animation = exportObject.animations.animation;
      expect(animation.length).to.equal(1);
      expect(animation[0].duration).to.equal(500);
      expect(animation[0].files).to.include.keys("0");
      expect(animation[0].files["0"]).to.deep.equal(defaultFileFrameValue);
    });

    /* This wasn't working before the refactor. // animation added first.
    it('should add all files to new animations.', function() {
      fileActions.addFile(files[0].name, files[0].path);
      let animationName = 'animation';
      animationActions.addAnimation(animationName);
      const exportObject = exportHandler.buildExportObject();
      var animation = exportObject.animations.animation;
      expect(animation.length).to.equal(1);
      expect(animation[0].duration).to.equal(500);
      expect(animation[0].files).to.include.keys("0");
      expect(animation[0].files["0"]).to.deep.equal(defaultFileFrameValue);
    });
    */

    it('should match the editor state tree.', function() {
      let animationName = 'animation';
      animationActions.addAnimation(animationName);
      fileActions.addFile(files[0].name, files[0].path);
      const exportObject = exportHandler.buildExportObject();
      var animation = exportObject.animations.animation;
      expect(exportObject).to.deep.equal(editorStore.getSnapshot());
    });

    it('should update with the canvas width.', function() {
      canvasActions.setWidth(500);
      const exportObject = exportHandler.buildExportObject();
      expect(exportObject.width).to.equal(500);
    });

    it('should update with the canvas height.', function() {
      canvasActions.setHeight(500);
      const exportObject = exportHandler.buildExportObject();
      expect(exportObject.height).to.equal(500);
    });
      
    it('should update the key of frames when files move.', function() {
      let animationName = 'animation';
      animationActions.addAnimation(animationName);
      fileActions.addFile(files[0].name, files[0].path);
      fileActions.addFile(files[1].name, files[1].path);
      frameActions.incrementTop();

      const exportObject1 = exportHandler.buildExportObject();
      expect(exportObject1.files.indexOf(files[0].name)).to.equal(0); // This should now be the second item in the list.
      expect(exportObject1.animations.animation[0].files["0"].top).to.equal(1);
      fileActions.moveSelectedFileDown();
      const exportObject2 = exportHandler.buildExportObject();
      expect(exportObject2.files.indexOf(files[0].name)).to.equal(1); // This should now be the second item in the list.
      expect(exportObject2.animations.animation[0].files["1"].top).to.equal(1);
    });
  });
});
