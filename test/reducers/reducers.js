require('babel/register');
import {app} from '../../src/reducers/reducers';
import {expect} from 'chai';
import actionCreators from '../../src/actions/action-creators';

describe('App', function() {
  describe('default state', function() {
    let state = app();
    it('should have no files in the file order', function() {
      expect(state.fileOrder).to.have.length(0);
    });

    it('should have no files in the entities', function() {
      expect(state.entities.files).to.be.empty;
    });

    it('should have no animations in the entities', function() {
      expect(state.entities.animations).to.be.empty;
    });

    it('should have no frames in the entities', function() {
      expect(state.entities.frames).to.be.empty;
    });

    it('should not have a selected file.', function() {
      expect(state.selectedFile).to.equal(null);
    });

    it('should not have a selected animation.', function() {
      expect(state.selectedAnimation).to.equal(null);
    });

    it('should not have a selected frame.', function() {
      expect(state.selectedFrame).to.equal(null);
    });

    it('should have a default canvasHeight and canvasWidth', function() {
      expect(state.canvasWidth).to.equal(300);
      expect(state.canvasHeight).to.equal(300);
    });
  });

  describe('importing state.', function() {
    let stateToBeImported = {
      canvasHeight: 400,
      canvasWidth: 400,
      entities: {
        animations: { 0: {id: 0, frames: [0], name: 'base'}},
        files: { 0: {id: 0, name: 'test.png'}},
        frames: { 0: {id: 0, duration: 500, fileFrames: [{file: 0, top: 0, left: 0, visible: true, rotation: 0}]}}
      }
    };
    let importedState = app(undefined, actionCreators.importState(stateToBeImported));

    it('should have filled in some of the missing values.', function() {
      expect(importedState.selectedFile).to.equal(0);
      expect(importedState.selectedFrame).to.equal(0);
      expect(importedState.selectedAnimation).to.equal(0);
      expect(importedState.canvasHeight).to.equal(400);
      expect(importedState.canvasWidth).to.equal(400);
      expect(importedState.entities.files).to.not.be.empty;
      expect(importedState.entities.frames).to.not.be.empty;
      expect(importedState.entities.animations).to.not.be.empty;
    });
  });

  describe('adjusting the canvas values.', function() {
    let state = app();
    it('should update the width.', function() {
      let widthState = app(state, actionCreators.setCanvasWidth(500));
      expect(widthState.canvasWidth).to.equal(500);
    });

    it('should update the height.', function() {
      let heightState = app(state, actionCreators.setCanvasHeight(500));
      expect(heightState.canvasHeight).to.equal(500);
    });
  });

  describe('adding file', function() {
    let state = app(undefined, actionCreators.addFile('test.png', 0));

    describe('selecting a file', function() {
      let secondFileAddedState = app(state, actionCreators.addFile('test1.png', 1));
      let selectedState = app(secondFileAddedState, actionCreators.selectFile(0));
      it('should have selected the first file added.', function() {
        expect(selectedState.selectedFile).to.equal(0);
      });
    });

    it('should have added the file to the file order', function() {
      expect(state.fileOrder).to.have.length(1);
    });

    it('should have added the file to the file entities.', function() {
      expect(state.entities.files).to.have.any.keys('0');
      expect(state.entities.files['0']).to.deep.equal({id: 0, name: 'test.png'});
    });

    it('should have marked the file as selected.', function() {
      expect(state.selectedFile).to.equal(0);
    });
  });

  describe('renaming a file.', function() {
    let state = app(undefined, actionCreators.addFile('test.png', 0));
    state = app(state, actionCreators.renameFile(0, 'test1.png'));
    expect(state.entities.files['0'].name).to.equal('test1.png');
  });

  describe('moving files', function() {
    let state = app(undefined, actionCreators.addFile('test.png', 0));
    state = app(state, actionCreators.addFile('test1.png', 1));
    it('should add the second file to the end of the fileOrder.', function() {
      expect(state.fileOrder).to.deep.equal([0,1]);
    });

    it('should update the fileOrder when the second file is moved up.', function() {
      let newState = app(state, actionCreators.moveFileUp(1));
      expect(newState.fileOrder).to.deep.equal([1,0]);
    });

    it('should update the fileOrder when the second file is moved up.', function() {
      let newState = app(state, actionCreators.moveFileDown(0));
      expect(newState.fileOrder).to.deep.equal([1,0]);
    });
  });

  describe('adding animations', function() {
    let state = app(undefined, actionCreators.addAnimation('Base', 0));
    it('should have added the animation to the entities.', function() {
      expect(state.entities.animations).to.not.be.empty;
      expect(state.entities.animations['0']).to.deep.equal({id: 0, name: 'Base', frames: []});
    });

    describe('selecting animations.', function() {
      let secondAnimationAddedState = app(state, actionCreators.addAnimation('Base2', 1));
      let selectedState = app(secondAnimationAddedState, actionCreators.selectAnimation(0));
      it('should have updated the selected animation', function() {
        expect(selectedState.selectedAnimation).to.equal(0);
      });
    });

    describe('renaming animations.', function() {
      let renamedState = app(state, actionCreators.renameAnimation(0, 'Base2'));
      it('should have updated the animation\'s name.', function() {
        expect(renamedState.entities.animations['0']).to.deep.equal({id: 0, name: 'Base2', frames: []});
      });
    });

    it('should have marked the animation as selected.', function() {
      expect(state.selectedAnimation).to.equal(0);
    });

    describe('adding a frame to an already added animation.', function() {
      let frameAddAction = actionCreators.addFrameToAnimation(0, 0);

      describe('selecting a frame.', function() {
        let testState = app(state, frameAddAction);
        testState = app(testState, actionCreators.addFrameToAnimation(0, frameAddAction.frame + 1));
        testState = app(testState, actionCreators.selectFrame(0));
        it('should have selected the frame.', function() {
          expect(testState.selectedFrame).to.equal(0);
        });
      });

      it('should have added the frame to the frame entities.', function() {
        let frameAddedState = app(state, frameAddAction);
        expect(frameAddedState.entities.frames).to.not.be.empty;
        expect(frameAddedState.entities.frames['0'].duration).to.equal(500);
      });

      it('should have added the frame id to the animation.', function() {
        let frameAddedState = app(state, frameAddAction);
        expect(frameAddedState.entities.animations['0'].frames).to.contain(0);
      });

      it('should have automatically marked the frame as selected.', function() {
        let frameAddedState = app(state, frameAddAction);
        expect(frameAddedState.selectedFrame).to.equal(0);
      });

      it('should correctly update the duration of the frame.', function() {
        let frameAddedState = app(state, frameAddAction);
        frameAddedState = app(frameAddedState, actionCreators.setDurationForFrame(0, 600));
        expect(frameAddedState.entities.frames['0'].duration).to.equal(600);
      });

      it('should correctly add an event to the frame.', function() {
        let frameAddedState = app(state, frameAddAction);
        frameAddedState = app(frameAddedState, actionCreators.addEventToFrame('hit', 0));
        expect(frameAddedState.entities.frames['0'].events).to.deep.equal(['hit']);
      });

      it('should correctly delete an event from the frame.', function() {
        let frameAddedState = app(state, frameAddAction);
        frameAddedState = app(frameAddedState, actionCreators.addEventToFrame('hit', 0));
        frameAddedState = app(frameAddedState, actionCreators.deleteEventFromFrame('hit', 0));
        expect(frameAddedState.entities.frames['0'].events).to.deep.equal([]);
      });

      describe('adding a frame when files already exist.', function() {
        it('should add a fileFrame for each file already added.', function() {
          let fileFrameState = app(state, actionCreators.addFile('test.png', 0));
          fileFrameState = app(fileFrameState, frameAddAction);
          expect(fileFrameState.entities.frames['0'].fileFrames).to.have.length(1);
        });
      });

      describe('adding a new frame, when another frame is already selected.', function(){
        it('should copy the values from the currently selected frame.', function() {
          let fileFrameState = app(state, actionCreators.addFile('test.png', 0));
          fileFrameState = app(fileFrameState, frameAddAction);
          fileFrameState = app(fileFrameState, actionCreators.incrementTopForSelectedFileFrame());
          fileFrameState = app(fileFrameState, actionCreators.addFrameToAnimation(0, 1));
          expect(fileFrameState.entities.frames['1'].fileFrames[0].top).to.equal(1);
        });
      });

      describe('editing frame values.', function() {
        let fileFrameState;
        beforeEach(function() {
          fileFrameState = app(state, actionCreators.addFile('test.png', 0));
          fileFrameState = app(fileFrameState, frameAddAction);
        });

        it('should correctly update the left of the selected file frame.', function() {
          fileFrameState = app(fileFrameState, actionCreators.incrementLeftForSelectedFileFrame());
          expect(fileFrameState.entities.frames['0'].fileFrames[0].left).to.equal(1);

          fileFrameState = app(fileFrameState, actionCreators.decrementLeftForSelectedFileFrame());
          expect(fileFrameState.entities.frames['0'].fileFrames[0].left).to.equal(0);

          fileFrameState = app(fileFrameState, actionCreators.setLeftForSelectedFileFrame(20));
          expect(fileFrameState.entities.frames['0'].fileFrames[0].left).to.equal(20);
        });

        it('should correctly update the top of the selected file frame.', function() {
          fileFrameState = app(fileFrameState, actionCreators.incrementTopForSelectedFileFrame());
          expect(fileFrameState.entities.frames['0'].fileFrames[0].top).to.equal(1);

          fileFrameState = app(fileFrameState, actionCreators.decrementTopForSelectedFileFrame());
          expect(fileFrameState.entities.frames['0'].fileFrames[0].top).to.equal(0);

          fileFrameState = app(fileFrameState, actionCreators.setTopForSelectedFileFrame(20));
          expect(fileFrameState.entities.frames['0'].fileFrames[0].top).to.equal(20);
        });

        it('should correctly update the visibility of the selected file frame.', function() {
          fileFrameState = app(fileFrameState, actionCreators.setVisibilityForSelectedFileFrame(false));
          expect(fileFrameState.entities.frames['0'].fileFrames[0].visible).to.be.false;;
        });

        it('should update when rotating the selected fileFrame.', function() {
          let newFrame = app(fileFrameState, actionCreators.rotateSelectedFileFrameLeft());
          expect(newFrame.entities.frames['0'].fileFrames[0].rotation).to.equal(-1);
          newFrame = app(fileFrameState, actionCreators.rotateSelectedFileFrameRight());
          expect(newFrame.entities.frames['0'].fileFrames[0].rotation).to.equal(1);
          newFrame = app(fileFrameState, actionCreators.setRotationForSelectedFileFrame(50));
          expect(newFrame.entities.frames['0'].fileFrames[0].rotation).to.equal(50);
        });

      });
    });

    describe('deleting frames', function() {
      let frameAddAction0 = actionCreators.addFrameToAnimation(0, 0);
      let frameAddAction1 = actionCreators.addFrameToAnimation(0, 1);
      let addedState = app(state, frameAddAction0);
      addedState = app(addedState, frameAddAction1);

      it('should remove the second frame and auto select the first frame.', function() {
        let removedState = app(addedState, actionCreators.deleteFrame(1));
        expect(Object.keys(removedState.entities.frames)).to.deep.equal(['0']);
        expect(removedState.selectedFrame).to.equal(0);
      });

      it('should remove the deleted frame from the animation that it was added to.', function() {
        let removedState = app(addedState, actionCreators.deleteFrame(1));
        expect(removedState.entities.animations['0'].frames).to.deep.equal([0]);
      });
    });
  });
});
