import {CmdType} from "./undo-redo-cmd-type";

export class Cmd {

  cmdType:CmdType;

  args:{};


  constructor(cmdType:CmdType, args:{}) {
    this.cmdType = cmdType;
    this.args = args;
  }

  getUndoCmd():Cmd {

    let type = null;
    let args = this.args;

    if (this.cmdType == CmdType.ADD) {
      // delete
      type = CmdType.DELETE;
      //pid index config

    } else if (this.cmdType == CmdType.DELETE) {
      // add
      type = CmdType.ADD;

    } else if (this.cmdType == CmdType.UPDATE) {
      //update
      type = CmdType.UPDATE;

    } else if (this.cmdType == CmdType.MOVE) {
      type = CmdType.MOVE;

    }
    return new Cmd(type, args);
  }


}
