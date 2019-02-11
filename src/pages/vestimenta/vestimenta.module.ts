import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VestimentaPage } from './vestimenta';

@NgModule({
  declarations: [
    VestimentaPage,
  ],
  imports: [
    IonicPageModule.forChild(VestimentaPage),
  ],
})
export class VestimentaPageModule {}
