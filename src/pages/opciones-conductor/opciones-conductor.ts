import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, App, Platform } from 'ionic-angular';
import { PerfilConductorPage } from '../perfil-conductor/perfil-conductor';
import { Usuario } from '../../interfaces/usuario.interface';
import { firebaseService } from '../../services/firebase.service';
import { TipoUsuarioPage } from '../tipo-usuario/tipo-usuario';
import { LoginPage } from '../login/login';
import { MisRutasPage } from '../mis-rutas/mis-rutas';

/**
 * Generated class for the OpcionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-opciones-conductor',
  templateUrl: 'opciones-conductor.html',
})
export class OpcionesConductorPage {

  @ViewChild(Nav) nav: Nav;

  email='';
  tipo='';
  data:Usuario={};
  placa;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public servicio: firebaseService,public app:App,private platform:Platform) {
      this.platform.registerBackButtonAction(() => {
        console.log('');
      },10000);
    this.email = navParams.get('email');
    this.tipo = navParams.get('tipo');
    this.placa=navParams.get('placa');
  }

  ionViewDidLoad() {
    console.log(this.email);
  }
  irPerfil()
  {
    this.navCtrl.push(PerfilConductorPage,{email: this.email,placa:this.placa});
  }
  irMisRutas()
  {
    this.navCtrl.push(MisRutasPage,{email: this.email,placa:this.placa});
  }
  cambiarUsuario()
  {
    let aux= this.email.split('.');
    this.data.correo = this.email;
    this.tipo='c';
    this.data.tipo = this.tipo;
    this.servicio.editP(this.data,aux);//poner p en el perfil de la base de datos
    var nav = this.app.getRootNav();
    nav.setRoot(TipoUsuarioPage ,{tipo:this.tipo,email: this.email});//MODIFICADO PARA PASAR LOS PARAMETROS
  }
  CerrarSesion()
  {
    let aux= this.email.split('.');
    this.data.correo = this.email;
    this.tipo='';
    this.data.tipo = this.tipo;
    this.servicio.editP(this.data,aux);//poner p en el perfil de la base de datos
    var nav = this.app.getRootNav();
    nav.setRoot(LoginPage);//MODIFICADO PARA PASAR LOS PARAMETROS
  }

}
