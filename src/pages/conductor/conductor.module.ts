import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConductorPage } from './conductor';

@NgModule({
  declarations: [
    ConductorPage,
  ],
  imports: [
    IonicPageModule.forChild(ConductorPage),
  ],
})
export class ConductorPageModule {}
