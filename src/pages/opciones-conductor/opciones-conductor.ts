import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, App, Platform } from 'ionic-angular';
import { PerfilConductorPage } from '../perfil-conductor/perfil-conductor';
import { Usuario } from '../../interfaces/usuario.interface';
import { firebaseService } from '../../services/firebase.service';
import { TipoUsuarioPage } from '../tipo-usuario/tipo-usuario';
import { LoginPage } from '../login/login';
import { MisRutasPage } from '../mis-rutas/mis-rutas';
import { mysqlService } from '../../services/mysql.service';

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

  id_usuario;
  usuario;
  tipo='';
  data:Usuario={};
  id_auto;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public servicio: firebaseService,public app:App,private platform:Platform,
    public mysql:mysqlService) {
      this.platform.registerBackButtonAction(() => {
        console.log('');
      },10000);
    this.id_usuario = navParams.get('id_usuario');
    this.id_auto=navParams.get('id_auto');
    let info;
    this.mysql.GetUsuario(this.id_usuario).subscribe(
      data => {
        console.log('data', data);
        info= Object.assign(data);
        console.log('exito');


        }, (error: any)=> {
          console.log('error', error);

        }
    );

    setTimeout(()=>{
      this.usuario=info;
      console.log(this.usuario[0]);
      
    },1000);
  }


  ionViewDidLoad() {
  }
  irPerfil()
  {
    this.navCtrl.push(PerfilConductorPage,{usuario: this.usuario[0],id_auto:this.id_auto});
  }
  irMisRutas()
  {
    this.navCtrl.push(MisRutasPage,{id_usuario: this.id_usuario,id_auto:this.id_auto});
  }
  cambiarUsuario()
  {
    let info;
    this.mysql.Tipo(this.id_usuario,'').subscribe(
      data => {
        console.log('data', data);
        info= Object.assign(data);
        console.log('exito');


        }, (error: any)=> {
          console.log('error', error);

        }
    );

    setTimeout(()=>{
      console.log('info',info);
      var nav = this.app.getRootNav();
      let nom=this.usuario[0].nombre+' '+this.usuario[0].apellido;
      nav.setRoot(TipoUsuarioPage ,{id_usuario: this.id_usuario,nombre_usuario:nom});
    },1000);
  }
  CerrarSesion()
  {
    let info;
    this.mysql.Tipo(this.id_usuario,'').subscribe(
      data => {
        console.log('data', data);
        info= Object.assign(data);
        console.log('exito');


        }, (error: any)=> {
          console.log('error', error);

        }
    );

    setTimeout(()=>{
      console.log('info',info);
      var nav = this.app.getRootNav();
    nav.setRoot(LoginPage);
    },1000);
    
  }

}
