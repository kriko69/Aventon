import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SlidePasajeroPage } from './slide-pasajero';

@NgModule({
  declarations: [
    SlidePasajeroPage,
  ],
  imports: [
    IonicPageModule.forChild(SlidePasajeroPage),
  ],
})
export class SlidePasajeroPageModule {}
