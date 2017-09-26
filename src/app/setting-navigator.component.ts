//my-setting-property

import {Component, Input} from '@angular/core';
import {ComponentNode} from "./component-node";

@Component({
  selector: 'my-setting-navigator',
  template: `
      <div class="tab-pane">
        <div  class="kit-sidebar-tab">
            <div class="kit-sidebar-top-section">
                <div class="title">Navigator</div>
                <div class="nav-buttons">
                    <div class="nav-button expand-all" (click)="expandAll()">Expand
                        All
                    </div>
                    <div class="nav-button collapse-all"  (click)="collapseAll()">
                        Collapse All
                    </div>
                </div>
            </div>
    
            <div class="kit-scrollable-native allow-drag-cursor scroll-shadow">
                <div class="top-shadow" style="opacity: 0;"></div>
                <div class="kit-scrollbar with-horizontal with-arrows allow-horizontal-swipe">
                    <div class="dom-tree">
                         <my-setting-navigator-node [treeNode]="root" [indent]="0"></my-setting-navigator-node>
                    </div>
                </div>
            </div>
    
        </div>
        
      </div>
  
  `,

})
export class SettingNavigatorComponent {

  @Input()
  root:ComponentNode;


  expandAll():void {
    if(!this.root) {
      return ;
    }
    this.root.expandAll();

  }

  collapseAll():void {
    if(!this.root) {
      return ;
    }
    this.root.collapseAll();
  }


}
