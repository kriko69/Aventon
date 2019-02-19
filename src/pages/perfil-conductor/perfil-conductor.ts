import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Platform } from 'ionic-angular';
import { Usuario } from '../../interfaces/usuario.interface';
import { AngularFireDatabase } from 'angularfire2/database';
import { firebaseService } from '../../services/firebase.service';
import { AgregarVehiculosPage } from '../agregar-vehiculos/agregar-vehiculos';
import { EditarVehiculoPage } from '../editar-vehiculo/editar-vehiculo';
import { Vehiculo } from '../../interfaces/vehiculo.interface';
import { VehiculoPage } from '../vehiculo/vehiculo';

import { ISubscription } from 'rxjs/Subscription';
import { EditarConductorPage } from '../editar-conductor/editar-conductor';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-perfil-conductor',
  templateUrl: 'perfil-conductor.html',
})
export class PerfilConductorPage {

  usuario;
  tipo='';
  value;
  id_auto;
  data:Usuario={  };
  info:any;
  user=[];
  vehiculos=[];
  controlP:ISubscription;
  controlV:ISubscription;

  constructor(public navCtrl: NavController, public navParams: NavParams,public app:App,
    public servicio: firebaseService,private platform:Platform) {
      this.platform.registerBackButtonAction(() => {
      },10000);
    this.usuario = navParams.get('usuario');
    this.id_auto = navParams.get('id_auto');
    console.log(this.usuario);
  }

  ionViewDidLoad() {
  }
  editPerfil()
  {
    var nav = this.app.getRootNav();
    nav.setRoot(EditarConductorPage,{usuario: this.usuario,id_auto:this.id_auto});//MODIFICADO PARA PASAR LOS PARAMETROS
  }
  verVehiculo()
  {
    var nav = this.app.getRootNav();
    nav.push(VehiculoPage,{id_usuario:this.usuario.ci});

  }

}
