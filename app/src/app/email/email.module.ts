import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboxComponent } from './inbox/inbox.component';
import { LeftPanelComponent } from './components/left-panel/left-panel.component';



@NgModule({
  declarations: [
    InboxComponent,
    LeftPanelComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class EmailModule { }
