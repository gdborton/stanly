require('babel/register');
const fs = require('fs');
const chai = require('chai');
const expect = chai.expect;
const editorStore = require('../src/stores/editor');
const fileActions = require('../src/actions/files');
const contextlessActions = require('../src/actions/contextless');
const files = require('./fixtures').files;

describe('files', function() {
  afterEach(function() {
    contextlessActions.resetStores();
  });

  describe('Initial files', function() {
    it('should have an initial length of 0', function() {
      expect(editorStore.getFiles).to.be.a('function');
      expect(editorStore.getFiles()).to.have.length(0);
    });
  });

  describe('fileActions', function() {
    describe('addFile', function() {
      it('should be defined', function() {
        expect(fileActions.addFile).to.be.a('function');
      });

      it('should add a file with the correct name/path to the file store.', function() {
        fileActions.addFile(files[1].name);
        expect(editorStore.getFiles()).to.have.length(1);
        expect(editorStore.getFiles()[0]).to.equal(files[1].name);
      });

      it('should add a file to the end of the files array when adding a new one.', function() {
        fileActions.addFile(files[1].name);
        fileActions.addFile(files[0].name);
        expect(editorStore.getFiles()).to.have.length(2);
        expect(editorStore.getFiles()[1]).to.equal(files[0].name);
      });
    });

    describe('renameFile', function() {
      // Stub fs.rename, it is used in the file store to rename the file on the drive.
      var originalRename = fs.rename;
      before(function() {
        fs.rename = function(a, b, callback) {
          callback();
        };
      });

      after(function() {
        fs.rename = originalRename;
      });

      it('should rename files, and update their paths', function() {
        fileActions.addFile(files[1].name);
        fileActions.renameFile(editorStore.getFiles()[0], 'renamedFile.png');
        expect(editorStore.getFiles()[0]).to.equal('renamedFile.png');
      });
    });
  });
});
