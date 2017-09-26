import {Injectable} from '@angular/core';
import {Subject}    from 'rxjs/Subject';
import {ComponentNode} from './component-node';

@Injectable()
export class IdeService {

  private command = new Subject<any>();

  command$ = this.command.asObservable();


  postMessage(cmd:any) {
    cmd.op = 'ide';
    console.log("post message to workspace:", cmd)
    this.command.next(cmd);
  }

  setPreAdd(component):void {
    let cmd = {
      type: 'setPreAdd',
      config: component.defaultConfig
    }
    this.postMessage(cmd);
  }

  setPreAddWithId(id:string):void {
    let cmd = {
      type: 'setPreAddWithId',
      id: id
    };
    this.postMessage(cmd);
  }

  clearPreAdd():void {
    let cmd = {
      type: 'clearPreAdd'
    }
    this.postMessage(cmd);
  }

  clearContextMenu():void {
    let cmd = {
      type: 'clearContextMenu'
    }
    this.postMessage(cmd);
  }

  setConfig2Workspace(config:{}):void {
    let cmd = {
      type: 'setConfig',
      config: config
    }
    this.postMessage(cmd);
  }

  selectComponent(id:string):void {
    let cmd = {
      type: 'setSelected',
      id: id
    }
    // debugger;
    this.postMessage(cmd);
  }

  addComponent(pid:string, config:{}, index:number, undoRedo:boolean):void {
    let cmd = {
      type: 'addNode',
      pid: pid,
      config: config,
      index: index,
      undoRedo: undoRedo
    }
    this.postMessage(cmd);
  }

  deleteNode(id:string, undoRedo:boolean):void {
    let cmd = {
      type: 'deleteNode',
      id: id,
      undoRedo: undoRedo
    }
    // debugger;
    this.postMessage(cmd);
  }

  moveNode(containerId:string, toAddId:string, index:number, undoRedo:boolean):void {
    let cmd = {
      type: 'moveNode',
      containerId: containerId,
      toAddId: toAddId,
      index: index,
      undoRedo: undoRedo
    }
    this.postMessage(cmd);
  }


  updateConfig(id:string, config:{}, undoRedo:boolean):void {
    let cmd = {
      type: 'updateConfig',
      id: id,
      config: config,
      undoRedo: undoRedo
    };
    this.postMessage(cmd);
  }

  getConfig():Promise<ComponentNode> {
    let config = new ComponentNode({
      type: 'layout',
      items: [{
        id: '2',
        type: 'div'
      },
        {
          id: '3a',
          type: 'div',
          items: [{
            id: '4a',
            type: 'row',
            items: [{
              type: 'col'
            },
              {
                type: 'col',
                items: [
                  {
                    type: 'text',
                    id: 't1'
                  }, {
                    type: 'text',
                    id: 't2'
                  }, {
                    type: 'text',
                    id: 't3'
                  }
                ]
              }]
          }]
        }],
    });
    return Promise.resolve(config);
  }


  setTargetElementWidthId(id:string, direction:{}):void {
    let cmd = {
      type: 'setTargetElementWidthId',
      id: id,
      direction: direction
    };
    this.postMessage(cmd);
  }

  setTargetElementWidthIdAndCalculateResult(id:string, direction:{}):void {
    let cmd = {
      type: 'setTargetElementWidthIdAndCalculateResult',
      id: id,
      direction: direction
    };
    this.postMessage(cmd);
  }

  //postMessage({op:'ide',type:'setSelected',id:'2'},'http://localhost:4200')

}
