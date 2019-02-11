import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TipoUsuarioPage } from './tipo-usuario';

@NgModule({
  declarations: [
    TipoUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(TipoUsuarioPage),
  ],
})
export class TipoUsuarioPageModule {}
