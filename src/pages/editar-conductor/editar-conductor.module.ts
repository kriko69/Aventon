import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarConductorPage } from './editar-conductor';

@NgModule({
  declarations: [
    EditarConductorPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarConductorPage),
  ],
})
export class EditarConductorPageModule {}
