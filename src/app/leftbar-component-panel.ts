import {Component, Input, Renderer2} from '@angular/core';
import {ComponentLayoutMeta} from './component-layout-meta';
import {IdeService} from "./ide.service";

let layoutMeta = new ComponentLayoutMeta();

@Component({
  selector: 'ide-leftbar-component-panel',
  template: `
    <div class="bem-AddTab" *ngIf="showAddElement && showAddElement.show">
    <div class="kit-slate slate-level-1">
        <div class="header"><h2>Add Element</h2>
            <div class="close" (click)="hideShow()"><i class="icon-main common-close"></i></div>
        </div>
        <div class="kit-scrollable-nano has-scrollbar scroll-shadow">
            <div class="kit-scroll-pane kit-section-group" tabindex="0">
                <div class="top-shadow" style="transform: translateY(-1px); opacity: 0;"></div>
            
                <div class="kit-section layout" *ngFor="let layout of layouts">
                    <div class="kit-section-title" (click)="toggleGroup(layout)">
                        <div class="tick sprite-main"></div>
                        <div class="label">{{layout.groupName}}</div>
                        <div class="cascade-indicator"><i class="sprite-main"></i></div>
                    </div>
                    <div class="kit-section-body no-padding" style="display:block" *ngIf="layout.open" >
                        <div class="bem-AddTab_Items" *ngFor="let cmp of layout.components">
                            <a 
                              [ngClass]="'bem-AddTab_Button-'+cmp.icon"
                               class="bem-AddTab_Button" 
                               (mousedown)="dragStart(cmp)"
                               >
                                <div class="help sprite-main"></div>
                                <div class="icon"></div>
                                <span class="label"><span>{{cmp.label}}</span></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="scroll-track" style="display: none;">
                <div class="scroll-handle" style="height: 393px; transform: translate(0px, 0px);"></div>
            </div>
        </div>
    </div>
</div>
    
  `
})
export class LeftbarComponentPanelComponent {

  @Input()
  showAddElement:any;

  constructor(private ideService:IdeService, private renderer:Renderer2) {

  }

  ngOnInit() {
    this.dragStopListener = this.renderer.listen(document, 'mouseup', ()=> {
      this.ideService.clearPreAdd();
      this.ideService.clearContextMenu();
    });
  }

  dragStopListener:()=>void;


  private meta:any[] = JSON.parse(JSON.stringify(layoutMeta.getComponents()));


  hideShow():void {
    this.showAddElement.show = false;
  }


  get layouts():any[] {
    return this.meta;
  }


  toggleGroup(layout):void {
    layout.open = !layout.open;
  }

  dragStart(cmp) {
    console.log('dragStart', cmp);
    this.ideService.setPreAdd(cmp);
    this.hideShow();
  }


}
