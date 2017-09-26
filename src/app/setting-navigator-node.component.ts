//my-setting-property

import {Component, Input, ElementRef} from '@angular/core';
import {Subject} from 'rxjs';

import {ComponentNode} from "./component-node";
import {IdeService} from "./ide.service";

@Component({
  selector: 'my-setting-navigator-node',
  template: `
      <div class="node-title">
        <div class="node-title-inner " style="display: flex;"
              [ngClass]="{'node-selected':  treeNode.selected, 'node-insert-top': insertTop, 'node-insert-bottom': insertBottom, 'node-not-accept':isDragNotAccept}"
               (mouseover)="mouseOver($event)"
               (mouseout)="mouseOut()"
               (mouseup)="mouseUp($event)"
               (mousedown)="mouseDown($event)"
               >
            <div>
              <span [ngClass]="{'no-items': treeNode.items.length == 0}" 
                    [style.marginLeft.px]="indent" 
                    style="margin-right: 3px"
                     (click)="toggleOpen()">
                <i class="sprite-main" [ngClass]="{'icon-expand-collapse':treeNode.open, 'icon-close-collapse': !treeNode.open}"></i>
              </span>
            </div>
            <div style="flex: auto; line-height: 12px" (click)="selectNode()">
              <i class="el-icon"></i>
              <span class="right-icon sprite-main"></span>
              <span class="lbl" >{{treeNode.type}}</span>
            </div>
        </div>
        <div class="children" *ngIf="treeNode.items.length >0 && treeNode.open">
            <my-setting-navigator-node *ngFor="let node of treeNode.items"
                    [treeNode]="node" [indent]="indentHandled">
            </my-setting-navigator-node>
        </div>
    </div>
    
  `,
  styles: [`
    .node-title {
        border-bottom: 0px;
    }
    .node-selected{
        background-color: rgb(66, 121, 172);
    }
    .no-items {
        visibility: hidden;
    }
    .node-title .icon-close-collapse {
        display: inline-block;
        width: 6px;
        height: 9px;
        vertical-align: 0px;
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transform-origin: 1px, 45%;
        transform-origin: 1px, 45%;
        background-position: -40px 0px;
    }
    .node-insert-top  {
      border-top:1px solid #2F9FFC;
    }
    .node-insert-bottom  {
      border-bottom:1px solid #2F9FFC;
    }
    
    .node-not-accept {
      border-color:red
    }
    
  `]
})
/**
 * TODO 联动
 */
export class SettingNavigatorNodeComponent {


  moveEvent$:Subject<any> = new Subject<any>();

  constructor(private ideService:IdeService, private el:ElementRef) {
    this.moveEvent$.debounceTime(80).subscribe(this._mousemove);
  }

  @Input()
  treeNode:ComponentNode;

  @Input()
  indent:number = 12;


  get isDragNotAccept():boolean {
    return !this.treeNode.accept;
  }

  get indentHandled():number {
    return this.indent + 12;
  }


  get insertTop():boolean {
    let node:ComponentNode = this.treeNode.getRoot().preAddComponentNode;
    if (node == null) {
      return false;
    }
    // console.log(this.treeNode.mouseOverFlag);
    if (!this.treeNode.mouseOverFlag) {
      return false;
    }
    if (this.treeNode.mouseOverTOP) {
      return true;
    }

    return false;
  }

  get insertBottom():boolean {
    let node:ComponentNode = this.treeNode.getRoot().preAddComponentNode;
    if (node == null) {
      return false;
    }
    // console.log(this.treeNode.mouseOverFlag);
    if (!this.treeNode.mouseOverFlag) {
      return false;
    }
    if (!this.treeNode.mouseOverTOP) {
      return true;
    }
    return false;
  }

  toggleOpen():void {
    this.treeNode.open = !this.treeNode.open;
  }


  selectNode():void {
    this.ideService.selectComponent(this.treeNode.getId())
  }

  _mousemove(arg:any) {

    let location = arg.that.getElementLocation();
    // debugger;
    // console.log(arg.event);
    let y = arg.event.pageY;
    let top = (location.top + location.height / 2) >= y;
    arg.that.treeNode.mouseOverTOP = top;

    arg.treeNode.getRoot().setMouseOver(arg.treeNode.getId());
    let node:ComponentNode = arg.treeNode.getRoot().preAddComponentNode;
    if (node && arg.treeNode.open == false) {
      arg.treeNode.open = true;
    }

    arg.that.ideService.setTargetElementWidthId(arg.that.treeNode.getId(), {
      isTop: arg.that.treeNode.mouseOverTOP,
      isLeft: arg.that.treeNode.mouseOverTOP
    });
  }

  mouseOver(event:MouseEvent):boolean {
    var arg = {
      treeNode: this.treeNode,
      that: this,
      event: event
    };
    //mouseOverTOP
    this.moveEvent$.next(arg);
    return false;
  }


  getElementLocation():any {
    if (!this.el) {
      return {
        width: 0,
        height: 0,
        left: 0,
        top: 0
      }
    }
    let width = this.el.nativeElement.children[0].getBoundingClientRect().width;
    let height = this.el.nativeElement.children[0].getBoundingClientRect().height;
    let left = this.el.nativeElement.children[0].getBoundingClientRect().left + document.documentElement.scrollLeft - document.documentElement.clientLeft;
    let top = this.el.nativeElement.children[0].getBoundingClientRect().top + document.documentElement.scrollTop - document.documentElement.clientTop;

    return {
      width: width,
      height: height,
      left: left,
      top: top
    }
  }

  mouseOut():boolean {

    // console.log('leave----id:' + this.treeNode.getId(), this.mouseOverFlag);
    return false;
  }

  mouseUp():void {
    let node:ComponentNode = this.treeNode.getRoot().preAddComponentNode;
    if (node == null) {
      return;
    }
    if (!this.treeNode.mouseOverFlag) {
      return;
    }
    this.ideService.setTargetElementWidthIdAndCalculateResult(this.treeNode.getId(), {
      isTop: this.treeNode.mouseOverTOP,
      isLeft: this.treeNode.mouseOverTOP
    });
  }


  mouseDown():void {
    this.ideService.setPreAddWithId(this.treeNode.getId());
  }


}
