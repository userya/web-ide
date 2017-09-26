import {Component, Inject} from '@angular/core';
import {IdeService} from "./ide.service";
import {ComponentNode} from './component-node';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  root:ComponentNode;

  constructor(private ideService:IdeService, @Inject("windowRef") private windowRef:Window) {
    let that = this;
    windowRef.addEventListener('message', function (e) {
      that._onWorkSpaceMessage(e.data);
    })

  }

  ngOnInit() {

  }

  _onWorkSpaceMessage(message:any):void {
    if (!message && !this.root) {
      return;
    }
    console.log("get workspace message:", message);
    switch (message.type) {
      case 'workspaceReady':
      {
        this.ideService.getConfig().then(config=> {
          this.root = config;
          this.ideService.setConfig2Workspace(this.root.toJSONObject());
        });
        break;
      }
      case 'selectComponent':
      {
        if (this.root) {
          this.root.selectComponent(message.id);
        }
        break;
      }
      case 'addComponent':
      {
        if (this.root) {
          this.root.addComponent(message.parentId, message.config, message.index, !message.undoRedo);
        }
        break;
      }
      case 'updateConfig':
      {
        if (this.root) {
          this.root.updateComponentConfig(message.id, message.config, !message.undoRedo);
        }
        break;
      }
      case 'removeComponent' :
      {
        if (message.id) {
          this.root.removeComponent(message.id, !message.undoRedo);
        }
        break;
      }
      case 'moveComponent' :
      {
        this.root.moveComponent(message.containerId, message.toAddId, message.index, !message.undoRedo);
        break;
      }
      case 'setPreAddWithId' :
      {
        if (message.id) {
          this.root.setPreAdd(message.id);
        }
        break;
      }
      case 'setPreAdd' :
      {
        if (message.config) {
          this.root.setPreAdd(message.id);
        }
        break;
      }
      case 'clearPreAdd' :
      {
        this.root.clearPreAdd(message.id);
        break;
      }
      case 'setIsAccept':
      {
        this.root.setIsAccept(message.targetId, message.accept);
        break;
      }
      case 'setTargetElementWidthId':
      {
        this.root.setTargetElementWidthId(message.id, message.direction);
        break;
      }
      case 'setContextMenu' :
      {
        this.root.setContextMenu(message.id, message.location);
        break;
      }
      case 'clearContextMenu':
      {
        this.root.clearContextMenu();
        break;
      }
      default :
      {

      }
    }

    //hover
    //selected
    //dragover

  }

}
