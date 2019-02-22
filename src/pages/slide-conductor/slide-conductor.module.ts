import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SlideConductorPage } from './slide-conductor';

@NgModule({
  declarations: [
    SlideConductorPage,
  ],
  imports: [
    IonicPageModule.forChild(SlideConductorPage),
  ],
})
export class SlideConductorPageModule {}
