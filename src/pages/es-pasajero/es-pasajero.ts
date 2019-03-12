import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { VerMiRutaPage } from '../ver-mi-ruta/ver-mi-ruta';
import { firebaseService } from '../../services/firebase.service';
import { ISubscription } from 'rxjs/Subscription';
import { mysqlService } from '../../services/mysql.service';

/**
 * Generated class for the EsPasajeroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-es-pasajero',
  templateUrl: 'es-pasajero.html',
})
export class EsPasajeroPage {
  integrante;
  id_usuario;
  id_auto;
  ruta_activada;
  vestimenta;

  correo='';
  capacidad=0;
  suscrito1:ISubscription;
  ruta='';
  foto='';
  info=[];
  nombre='';
  email='';

  gorra='';
  superior='';
  inferior='';
  accesorio='';

  fotoUsuario:string;


  constructor(public navCtrl: NavController, public navParams: NavParams,
  private servicio:firebaseService,private platform:Platform,public mysql:mysqlService) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.id_usuario=navParams.get('id_usuario');
    this.id_auto=navParams.get('id_auto');
    this.integrante=navParams.get('integrante');
    this.ruta_activada=navParams.get('ruta_activada');
    this.foto='../../assets/imgs/roma@ucb.jpg';
    this.mysql.obtenerVestimenta(this.integrante.id_viaje,this.integrante.ci).subscribe(
      (data)=>{
        this.vestimenta=data;
      }
    );
    setTimeout(() => {
      console.log("vestimenta",this.vestimenta);
      this.nombre=this.integrante.nombre+' '+this.integrante.apellido;
      this.gorra=this.vestimenta.sombrero;
      this.superior=this.vestimenta.superior;
      this.inferior=this.vestimenta.inferior;
      this.accesorio=this.vestimenta.accesorio;
      
    }, 1000);
    this.fotoUsuario = this.integrante.ci;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EsPasajeroPage');
    this.fotoUsuario = this.integrante.ci;
    this.mysql.validarFotoUsuario(this.fotoUsuario).subscribe(
      data=>{
        if(data['message']=="existe")
        {
          this.fotoUsuario = "http://jauzled.com/img/Perfil/"+this.fotoUsuario + ".jpg";
        }
        if(data['message']=="no existe")
        {
          this.fotoUsuario = "http://jauzled.com/img/defaultUsuario.jpg";
        }
      },error=>{
          this.fotoUsuario = "http://jauzled.com/img/defaultUsuario.jpg";      
      }
      
    );
  }

  aceptar()
  {
    this.nombre='';
    this.info=[];
    this.navCtrl.setRoot(VerMiRutaPage,{id_usuario:this.id_usuario,id_auto:this.id_auto,ruta_activada:this.ruta_activada});
  }

}
