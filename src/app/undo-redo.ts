import {Cmd} from "./undo-redo-cmd";

export class UndoRedo {

  private redoStack:Array<Cmd> = [];

  private undoStack:Array<Cmd> = [];


  addCommand(cmd:Cmd) {
    console.log("pushCmd", cmd);
    this.undoStack.push(cmd);
  }

  undo():Cmd {
    if (this.undoStack.length == 0) {
      return null;
    }

    let cmd:Cmd = this.undoStack.splice(this.undoStack.length - 1, 1)[0];
    this.redoStack.push(cmd);
    return cmd.getUndoCmd();
  }

  redo():Cmd {
    if (this.redoStack.length == 0) {
      return null;
    }
    let cmd:Cmd = this.redoStack.splice(this.redoStack.length - 1, 1)[0];
    this.undoStack.push(cmd);
    return cmd;
  }


  hasUndoCmd():boolean {
    return this.undoStack.length > 0;
  }

  hasRedoCmd():boolean {
    return this.redoStack.length > 0;
  }


}
