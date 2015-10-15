require('babel/register');

const exportHandler = require('../../src/utils/export-handler');
const contextlessActions = require('../../src/actions/contextless');
const {expect} = require('chai');

describe('Export Handler', function() {
  afterEach(function() {
    contextlessActions.resetStores();
  });

  it('should have a default export object.', function() {
    const exportObject = exportHandler.buildExportObject();
    expect(exportObject.width).to.equal(300);
    expect(exportObject.height).to.equal(300);
    expect(exportObject.files).to.be.empty;
    expect(exportObject.animations).to.deep.equal({});
  });
});
