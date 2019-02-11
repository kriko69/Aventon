import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PasajeroPage } from './pasajero';

@NgModule({
  declarations: [
    PasajeroPage,
  ],
  imports: [
    IonicPageModule.forChild(PasajeroPage),
  ],
})
export class PasajeroPageModule {}
