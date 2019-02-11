import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarPasajeroPage } from './editar-pasajero';

@NgModule({
  declarations: [
    EditarPasajeroPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarPasajeroPage),
  ],
})
export class EditarPasajeroPageModule {}
