import { mysqlService } from './../../services/mysql.service';
import { firebaseService } from './../../services/firebase.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, LoadingController} from 'ionic-angular';
import { RegistrarPage } from '../registrar/registrar';
import { login } from '../../interfaces/login.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import { TipoUsuarioPage } from '../tipo-usuario/tipo-usuario';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  splash=true; //SPLASh
  tabBarElement: any; //SPLASH

  user= {} as login;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private afAuth:AngularFireAuth, public alerta:AlertController,
  public pla:Platform, public load:LoadingController, public mysql:mysqlService,private platform:Platform) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);

      //this.tabBarElement=document.querySelector('.tabbar');

  }
  ionViewDidLoad(){
    //this.tabBarElement.style.display='none';
    setTimeout(()=>{
      this.splash=false;
      //this.tabBarElement.style.display='flex';

    },4000);
  }


  irRegistro()
  {
    this.navCtrl.push(RegistrarPage);
  }
 
  ingresar(user)
  {
    let info={};
    this.mysql.ValidarrUsuario(user).subscribe(
      data => {
        console.log('data',data);
        console.log('exito');
        info=Object.assign(data);

        }, (error: any)=> {
          console.log('error', error);

        }
    );
    this.presentLoading();
    setTimeout(()=>{
      if(info['nombre']!=undefined){
      this.navCtrl.setRoot(TipoUsuarioPage,{id_usuario:info['ci'],nombre_usuario:info['nombre']+' '+info['apellido']});
      }
      else{
        this.mostrarAlerta();
      }
    },1000);

  }

  presentLoading() {
    const loader = this.load.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }

  mostrarAlerta() {
    const alert = this.alerta.create({
      title: 'Datos incorrectos!',
      subTitle: 'Existe algun dato incorrecto por favor intente de nuevo.',
      buttons: ['OK']
    });
    alert.present();
  }


}
