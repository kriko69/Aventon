import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePasajeroPage } from './home-pasajero';

@NgModule({
  declarations: [
    HomePasajeroPage,
  ],
  imports: [
    IonicPageModule.forChild(HomePasajeroPage),
  ],
})
export class HomePasajeroPageModule {}
