import {Component, Input} from '@angular/core';
import {ComponentNode} from "./component-node";

@Component({
  selector: 'my-setting',
  templateUrl: './setting.component.html'
})
export class SettingComponent {

  @Input()
  root:ComponentNode;


  panelIndex:number = 2;

  changePanelIndex(index:number):void {
    this.panelIndex = index;
  }





}
