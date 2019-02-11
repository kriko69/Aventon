import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservaPasajeroPage } from './reserva-pasajero';

@NgModule({
  declarations: [
    ReservaPasajeroPage,
  ],
  imports: [
    IonicPageModule.forChild(ReservaPasajeroPage),
  ],
})
export class ReservaPasajeroPageModule {}
