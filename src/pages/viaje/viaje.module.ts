import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViajePage } from './viaje';

@NgModule({
  declarations: [
    ViajePage,
  ],
  imports: [
    IonicPageModule.forChild(ViajePage),
  ],
})
export class ViajePageModule {}
