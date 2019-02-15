import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Platform } from 'ionic-angular';
import { VehiculoPage } from '../vehiculo/vehiculo';
import { firebaseService } from '../../services/firebase.service';
import { Usuario } from '../../interfaces/usuario.interface';

import { ISubscription } from 'rxjs/Subscription';
import { EditarPasajeroPage } from '../editar-pasajero/editar-pasajero';
/**
 * Generated class for the PerfilPasajeroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil-pasajero',
  templateUrl: 'perfil-pasajero.html',
})
export class PerfilPasajeroPage {


  usuario='';

  constructor(public navCtrl: NavController, public navParams: NavParams,public app:App,
    public servicio: firebaseService,private platform:Platform) {
      this.platform.registerBackButtonAction(() => {
      },10000);
    this.usuario = navParams.get('usuario');
    console.log(this.usuario);
  }

  ionViewDidLoad() {
  }
  editPerfil()
  {
    var nav = this.app.getRootNav();
    nav.setRoot(EditarPasajeroPage,{usuario: this.usuario});//MODIFICADO PARA PASAR LOS PARAMETROS
  }


}
