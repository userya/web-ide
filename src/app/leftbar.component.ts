import {Component} from '@angular/core';

@Component({
  selector: 'my-leftbar',
  templateUrl:'./leftbar.component.html'
})
export class LeftbarComponent {

  addElementConfig:any =  {
    show:false
  }


  currentPanel :number ;

  togglePanel(index:number):void  {
    this.currentPanel = index ;
    this.addElementConfig.show = true ;
  }

}
