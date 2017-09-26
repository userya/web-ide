import {Component, Input} from '@angular/core';
import {IdeService} from "./ide.service";
import {ComponentNode} from './component-node';

@Component({
  selector: 'my-context-menu',
  templateUrl: './context-menu.html'
})
export class ContextMenuComponent {

  constructor(private ideService:IdeService) {

  }

  @Input()
  root:ComponentNode;

  get show() {
    return this.root && this.root.contextMenuComponentNode != null;
  }


  get locationLeft() {
    if (this.root && this.root.contextMenuLocation != null) {
      return this.root.contextMenuLocation['left'];
    }
    return 0;
  }

  get locationTop() {
    if (this.root && this.root.contextMenuLocation != null) {
      return this.root.contextMenuLocation['top'];
    }
    return 0;
  }


  get selectTree():ComponentNode[] {
    let array = [];
    if (this.root != null && this.root.selectedComponentNode != null) {

      let node = this.root.selectedComponentNode;
      while (node != null) {
        array.push(node);
        node = node.getParent();
      }
    }
    // console.log(array);
    return array;
  }

  isSelected(node:ComponentNode):boolean {
    if (node.getId() == this.root.selectedComponentNode.getId()) {
      return true;
    }
    return false;
  }

  select(node:ComponentNode):void {
    this.ideService.selectComponent(node.getId());
  }

  deleteNode():void {
    if(this.root.contextMenuComponentNode) {
      this.ideService.deleteNode(this.root.contextMenuComponentNode.getId(), false);
    }
  }

}
