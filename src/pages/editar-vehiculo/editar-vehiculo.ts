import { ConductorPage } from './../conductor/conductor';
import { VehiculoPage } from './../vehiculo/vehiculo';
import { Vehiculo } from './../../interfaces/vehiculo.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { firebaseService } from '../../services/firebase.service';
import { ToastService } from '../../services/toast.service';
import { mysqlService } from '../../services/mysql.service';

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

  auto:any;
  id_usuario;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public servicio:firebaseService, public toast:ToastService,private platform:Platform,
  public mysql:mysqlService) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.id_usuario=this.navParams.get('id_usuario');
    this.auto=this.navParams.get('auto');
    console.log(this.id_usuario);
    console.log('AUTO: '+this.auto.placa);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarVehiculoPage');
  }

  actualizar()
  {
    let h=this.mysql.UpdateAutos(this.auto);
    if (h["mensaje"]!=null || h["mensaje"]!=undefined || h["mensaje"]!='')
    {
      this.toast.show(` Vehiculo ${this.auto.marca} ${this.auto.placa} actualizado!`);
        this.navCtrl.setRoot(VehiculoPage,{id_usuario: this.id_usuario});
      console.log("se edito");
    }
  }

  eliminar()
  {
    let h=this.mysql.EliminarAuto(this.auto);
    if (h["mensaje"]!=null || h["mensaje"]!=undefined || h["mensaje"]!='')
    {
      this.toast.show(` Vehiculo ${this.auto.marca} ${this.auto.placa} eliminado!`);
        this.navCtrl.setRoot(VehiculoPage,{id_usuario: this.id_usuario});
      console.log("se elimino");
    }
  }

  irConductor()
  {
    this.navCtrl.setRoot(ConductorPage,{id_usuario:this.id_usuario,capacidad:this.auto.capacidad,placa:this.auto.id});
  }
}
