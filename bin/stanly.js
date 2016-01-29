#!/usr/bin/env node

var childProcess = require('child_process');
var prebuilt = require('electron-prebuilt');
var path = require('path');

childProcess.spawn(prebuilt, [path.normalize(__dirname + '/..')], {stdio: 'inherit', detached: true});
process.exit();
