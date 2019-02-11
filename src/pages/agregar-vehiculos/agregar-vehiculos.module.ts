import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgregarVehiculosPage } from './agregar-vehiculos';

@NgModule({
  declarations: [
    AgregarVehiculosPage,
  ],
  imports: [
    IonicPageModule.forChild(AgregarVehiculosPage),
  ],
})
export class AgregarVehiculosPageModule {}
