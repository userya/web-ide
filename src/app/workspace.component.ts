import {Component, ElementRef} from '@angular/core'
import {IdeService} from "./ide.service";
import {Subscription}   from 'rxjs/Subscription';

@Component({
  selector: 'my-workspace',
  templateUrl: './workspace.component.html'
})
export class WorkspaceComponent {

  subscription:Subscription;

  constructor(private el:ElementRef, private ideService:IdeService) {
    var that = this;
    this.subscription = ideService.command$.subscribe(
      mission => {
        // console.log(mission);
        that.postCommand(mission)
      }
    )
  }


  postCommand(cmd:any):void {
    // console.log(this.el);
    var iframeWin = this.el.nativeElement.querySelector("#site-iframe").contentWindow;
    iframeWin.postMessage(cmd, 'http://localhost:4200');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
