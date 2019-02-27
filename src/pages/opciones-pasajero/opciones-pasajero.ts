import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,Nav, App, Platform } from 'ionic-angular';
import { TipoUsuarioPage } from '../tipo-usuario/tipo-usuario';
import { LoginPage } from '../login/login';
import { firebaseService } from '../../services/firebase.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { PerfilPasajeroPage } from '../perfil-pasajero/perfil-pasajero';
import { mysqlService } from '../../services/mysql.service';

/**
 * Generated class for the OpcionesPasajeroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-opciones-pasajero',
  templateUrl: 'opciones-pasajero.html',
})
export class OpcionesPasajeroPage {
  @ViewChild(Nav) nav: Nav;
  
  id_usuario;
  //usuario;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public servicio: firebaseService, public app:App,private platform:Platform
    ,public mysql:mysqlService) {
      this.platform.registerBackButtonAction(() => {
        console.log('');
      },10000);
    this.id_usuario = navParams.get('id_usuario');
  }

  ionViewDidLoad() {
    console.log(this.id_usuario);
  }
  irPerfil()
  {
    this.navCtrl.push(PerfilPasajeroPage,{id_usuario:this.id_usuario});
  }
  cambiarUsuario()
  {
      var nav = this.app.getRootNav();
      nav.setRoot(TipoUsuarioPage ,{id_usuario: this.id_usuario});
  }
  CerrarSesion()
  {
      var nav = this.app.getRootNav();
    nav.setRoot(LoginPage);
    
  }

}
