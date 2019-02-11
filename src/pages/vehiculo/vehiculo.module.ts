import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehiculoPage } from './vehiculo';

@NgModule({
  declarations: [
    VehiculoPage,
  ],
  imports: [
    IonicPageModule.forChild(VehiculoPage),
  ],
})
export class VehiculoPageModule {}
