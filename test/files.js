require('babel/register');
var fs = require('fs');
var chai = require('chai');
var expect = chai.expect;
var fileStore = require('../src/stores/files');
var fileActions = require('../src/actions/files');

describe('files', function() {
  describe('Initial files', function() {
    it('should have an initial length of 0', function() {
      expect(fileStore.getFiles).to.be.a('function');
      expect(fileStore.getFiles()).to.have.length(0);
    });
  });

  describe('fileActions', function() {
    var files = [{name: 'asdf1.png', path: './path/asdf1.png'}, {name: 'asdf2.png', path: './path/asdf2.png'}];
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
        fileActions.renameFile(fileStore.getFiles()[0], 'renamedFile.png');
        expect(fileStore.getFiles()[0].name).to.equal('renamedFile.png');
      });
    });
  });
});
