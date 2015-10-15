require('babel/register');
const fs = require('fs');
const chai = require('chai');
const expect = chai.expect;
const fileStore = require('../src/stores/files');
const fileActions = require('../src/actions/files');
const contextlessActions = require('../src/actions/contextless');
const files = require('./fixtures').files;

describe('files', function() {
  afterEach(function() {
    contextlessActions.resetStores();
  });

  describe('Initial files', function() {
    it('should have an initial length of 0', function() {
      expect(fileStore.getFiles).to.be.a('function');
      expect(fileStore.getFiles()).to.have.length(0);
    });
  });

  describe('fileActions', function() {
    describe('addFile', function() {
      it('should be defined', function() {
        expect(fileActions.addFile).to.be.a('function');
      });

      it('should add a file with the correct name/path to the file store.', function() {
        fileActions.addFile(files[1].name, files[1].path);
        expect(fileStore.getFiles()).to.have.length(1);
        expect(fileStore.getFiles()[0].name).to.equal(files[1].name);
        expect(fileStore.getFiles()[0].path).to.equal(files[1].path);
      });

      it('should add a file to the end of the files array when adding a new one.', function() {
        fileActions.addFile(files[1].name, files[1].path);
        fileActions.addFile(files[0].name, files[0].path);
        expect(fileStore.getFiles()).to.have.length(2);
        expect(fileStore.getFiles()[1].name).to.equal(files[0].name);
        expect(fileStore.getFiles()[1].path).to.equal(files[0].path);
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
        fileActions.addFile(files[1].name, files[1].path);
        fileActions.renameFile(fileStore.getFiles()[0], 'renamedFile.png');
        expect(fileStore.getFiles()[0].name).to.equal('renamedFile.png');
      });
    });
  });
});
