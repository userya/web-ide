//my-setting-property

import {Component, Input} from '@angular/core';
import {ComponentNode} from "./component-node";
import {IdeService} from "./ide.service";

@Component({
  selector: 'my-setting-property',
  template: `
     <div class="tab-pane">
    <div id="settings-tab" class="kit-sidebar-tab settings-tab">
        <div *ngIf="noneSelected">
            <div class="kit-sidebar-top-section">
                <div class="selected-node-title">
                    <div class="type-icon-inset">
                        <div class="el-icon n-div"></div>
                    </div>
                    <div class="label">None Selected</div>
                </div>
            </div>
            <div class="kit-blocker dummy">
                <div class="notice dummy">
                    <div class="icon sprite-main"></div>
                    <div class="message">
                        <div class="bem-Paragraph "
                             style="font-size: 11px; padding: 0px 20px 8px; line-height: 14px;">Select
                            an element of your website to activate this panel.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div *ngIf="!noneSelected" class="kit-sidebar-top-section">
            <div class="selected-node-title">
                <div class="type-icon-inset">
                    <div class="el-icon n-input"></div>
                </div>
                <div class="label">{{selected.type}} Settings</div>
            </div>
            <div id="general-settings">
                <div data-reactroot="" class="general-settings clearfix">
                    <div class="kit-divider top"></div>
                    <div class="kit-panel">
                        <div class="kit-field element-id">
                            <div class="kit-label">ID:</div>
                            <div class="kit-text-box kit-text-input kit-input-control text-box">
                              <input [(ngModel)]="componentId"
                                    type="text" class="input" placeholder="ComponentId">
                            </div>
                                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div *ngIf="!noneSelected" class="kit-scrollable-nano">
            <div class="kit-scroll-pane kit-section-group">

                <div id="contributor-settings"></div>
            </div>
            <div class="scroll-track" style="display: none;">
                <div class="scroll-handle" style="height: 383px; transform: translate(0px, 0px);"></div>
            </div>
        </div>

    </div>
</div>
  
  `
})
export class SettingPropertyComponent {

  @Input()
  root:ComponentNode;

  constructor(private ideService:IdeService) {

  }


  get noneSelected():boolean {
    return !(this.root != null && this.root.selectedComponentNode != null)
  }

  get selected():ComponentNode {
    return this.root.selectedComponentNode;
  }

  get componentId():string {
    return this.selected.getId();
  }


  set componentId(id:string) {
    if(id == '') {
      return ;
    }
    // console.log('setValue----' + id);
    this.ideService.updateConfig(this.selected.getId(), {
      id: id
    }, false);
  }


}
