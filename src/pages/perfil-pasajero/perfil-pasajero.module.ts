import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilPasajeroPage } from './perfil-pasajero';

@NgModule({
  declarations: [
    PerfilPasajeroPage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilPasajeroPage),
  ],
})
export class PerfilPasajeroPageModule {}
