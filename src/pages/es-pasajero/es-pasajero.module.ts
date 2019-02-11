import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EsPasajeroPage } from './es-pasajero';

@NgModule({
  declarations: [
    EsPasajeroPage,
  ],
  imports: [
    IonicPageModule.forChild(EsPasajeroPage),
  ],
})
export class EsPasajeroPageModule {}
