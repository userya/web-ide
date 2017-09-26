import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {WorkspaceComponent} from './workspace.component';
import {SettingComponent} from './setting.component';
import {TopbarComponent} from './topbar.component';
import {LeftbarComponent} from './leftbar.component';
import {BottombarComponent} from './bottombar.component';
import {LeftbarComponentPanelComponent} from './leftbar-component-panel';

import {SettingPropertyComponent} from './setting-property.component';
import {SettingNavigatorComponent} from './setting-navigator.component';
import {SettingNavigatorNodeComponent} from './setting-navigator-node.component';
import {ContextMenuComponent} from './context-menu.component';

import {IdeService} from './ide.service';

@NgModule({
  declarations: [
    AppComponent,
    WorkspaceComponent,
    SettingComponent,
    TopbarComponent,
    LeftbarComponent,
    BottombarComponent,
    LeftbarComponentPanelComponent,
    SettingPropertyComponent,
    SettingNavigatorComponent,
    SettingNavigatorNodeComponent,
    ContextMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([/*{
     path: ''
     }*/])
  ],
  providers: [IdeService, {provide: 'windowRef', useValue: window}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
