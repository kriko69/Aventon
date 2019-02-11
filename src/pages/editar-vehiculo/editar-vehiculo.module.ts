import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarVehiculoPage } from './editar-vehiculo';

@NgModule({
  declarations: [
    EditarVehiculoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarVehiculoPage),
  ],
})
export class EditarVehiculoPageModule {}
