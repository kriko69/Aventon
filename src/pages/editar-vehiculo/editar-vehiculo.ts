import { ConductorPage } from './../conductor/conductor';
import { VehiculoPage } from './../vehiculo/vehiculo';
import { Vehiculo } from './../../interfaces/vehiculo.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { firebaseService } from '../../services/firebase.service';
import { ToastService } from '../../services/toast.service';

/**
 * Generated class for the EditarVehiculoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-vehiculo',
  templateUrl: 'editar-vehiculo.html',
})
export class EditarVehiculoPage {

  auto:Vehiculo;
  email;
  aux;
  rama;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public servicio:firebaseService, public toast:ToastService,private platform:Platform) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.email=this.navParams.get('email');
    this.aux=this.email.split('.');
    this.rama=this.aux[0];
    this.auto=this.navParams.get('auto');
    console.log(this.email);
    console.log('AUTO: '+this.auto.placa);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarVehiculoPage');
  }

  actualizar()
  {
    this.servicio.definirAutoRef(this.auto.placa,this.rama);
    this.servicio.editarAutos(this.auto,this.auto.placa,this.rama).then(
      ()=>{
        this.toast.show(` Vehiculo ${this.auto.marca} ${this.auto.placa} actualizado!`);
        this.navCtrl.setRoot(VehiculoPage,{email: this.email});
      }
    );
  }

  eliminar()
  {
    this.servicio.eliminarAutos(this.auto.placa,this.rama).then(
      ()=>{
        this.toast.show(` Vehiculo ${this.auto.marca} ${this.auto.placa} eliminado!`);
        this.navCtrl.setRoot(VehiculoPage,{email: this.email});
      }
    );
  }

  irConductor()
  {
    this.navCtrl.setRoot(ConductorPage,{email:this.email,capacidad:this.auto.capacidad,placa:this.auto.placa});
  }
}
