import {Component, Input} from '@angular/core';
import {ComponentNode} from "./component-node";
import {IdeService} from "./ide.service";

@Component({
  selector: 'my-bottombar',
  templateUrl: './bottombar.component.html'
})
export class BottombarComponent {


  constructor(private ideService: IdeService){

  }

  @Input()
  node:ComponentNode; //root


  get hasSelected():boolean {
    return this.node != null && this.node.selectedComponentNode != null;
  }


  get selectTree():ComponentNode[] {
    let array = [];
    if (this.node != null && this.node.selectedComponentNode != null) {

      let node = this.node.selectedComponentNode;
      while (node != null) {
        array.push(node);
        node = node.getParent();
      }
    }
    // console.log(array);
    return array;
  }


  selectNode(node:ComponentNode):void {
    this.ideService.selectComponent(node.getId());
  }

}
