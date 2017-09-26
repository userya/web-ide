import {Component, Input} from '@angular/core';
import {ComponentNode} from "./component-node";
import {Cmd} from "./undo-redo-cmd";
import {CmdType} from "./undo-redo-cmd-type";
import {IdeService} from "./ide.service";

@Component({
  selector: 'my-topbar',
  templateUrl: './topbar.component.html'
})
export class TopbarComponent {

  @Input()
  root:ComponentNode;

  constructor(private ideService:IdeService) {

  }

  get hasUndo() {
    if (this.root && this.root.undoRedo.hasUndoCmd()) {
      return true;
    }
    return false;
  }

  get hasRedo() {
    if (this.root && this.root.undoRedo.hasRedoCmd()) {
      return true;
    }
    return false;
  }

  undo():void {
    if (!this.hasUndo) {
      return;
    }
    let cmd:Cmd = this.root.undoRedo.undo();

    let params = cmd.args['undo'];
    if (cmd.cmdType == CmdType.ADD) {
      this.ideService.addComponent(params.parentId, params.config, params.index, true);
    } else if (cmd.cmdType == CmdType.DELETE) {
      this.ideService.deleteNode(params.id, true);
    } else if (cmd.cmdType == CmdType.UPDATE) {
      this.ideService.updateConfig(params.id, params.config, true);
    } else if (cmd.cmdType == CmdType.MOVE) {
      this.ideService.moveNode(params.containerId, params.toAddId, params.index, true);
    }
  }


  redo():void {
    if (!this.hasRedo) {
      return;
    }
    let cmd:Cmd = this.root.undoRedo.redo();
    let params = cmd.args['redo'];
    if (cmd.cmdType == CmdType.ADD) {
      this.ideService.addComponent(params.parentId, params.config, params.index, true);
    } else if (cmd.cmdType == CmdType.DELETE) {
      this.ideService.deleteNode(params.id, true);
    } else if (cmd.cmdType == CmdType.UPDATE) {
      this.ideService.updateConfig(params.id, params.config, true);
    } else if (cmd.cmdType == CmdType.MOVE) {
      this.ideService.moveNode(params.containerId, params.toAddId, params.index, true);
    }
  }


}
