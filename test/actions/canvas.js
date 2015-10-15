require('babel/register');
const canvasActions = require('../../src/actions/canvas');
const editorStore = require('../../src/stores/editor');
const expect = require('chai').expect;

describe('Canvas Actions', function() {
  describe('argument coercion', function() {
    it('should convert string values to integers', function() {
      canvasActions.setWidth("400");
      expect(editorStore.getWidth()).to.equal(400);
      canvasActions.setWidth("500");
      expect(editorStore.getWidth()).to.equal(500);
    });
  });
});
