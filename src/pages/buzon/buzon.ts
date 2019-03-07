import { ToastService } from './../../services/toast.service';
import { mysqlService } from './../../services/mysql.service';
import { AceptarSolicitudPage } from './../aceptar-solicitud/aceptar-solicitud';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { firebaseService } from '../../services/firebase.service';
import { CalificacionPage } from '../calificacion/calificacion';

/**
 * Generated class for the BuzonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buzon',
  templateUrl: 'buzon.html',
})
export class BuzonPage {
  id_usuario;
  id_auto;
  solicitudes=[];
  boleano=true;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public toast:ToastService ,private platform:Platform,public mysql:mysqlService) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.id_usuario=this.navParams.get('id_usuario');
    this.id_auto=this.navParams.get('id_auto');

    this.listarMensajes();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuzonPage');
  }

  listarMensajes()
  {
    this.mysql.listarSolicitudesConductor(this.id_usuario).subscribe(
      data => {
        console.log('data',data);
        console.log('exito');
        if(data!=undefined){
          if(data['message']!='No se encontró')
          {
            this.solicitudes=Object.assign(data);
            this.boleano=false;
          }
          else{
            this.solicitudes=[];
          }
        }
        else{
          this.solicitudes=[];
        }
      }, (error: any)=> {
        console.log('error', error);
      }
    );
  }

  borrarMensajes()
  {
    this.mysql.borrarSolicitudesConductor(this.id_usuario).subscribe(
      data => {
        console.log('data',data);
        this.toast.show('Todos los mensajes eliminados')
        this.listarMensajes();
      }, (error: any)=> {
        console.log('error', error);
      }
    );
  }



  aceptar(solicitud)
  {
    console.log("item",solicitud);

    this.navCtrl.push(AceptarSolicitudPage,{id_usuario:this.id_usuario,solicitud:solicitud,id_auto:this.id_auto});
  }
  calif(obj)
  {
    this.navCtrl.push(CalificacionPage,{id_usuario:this.id_usuario,obj:obj,id_auto:this.id_auto});
  }
}
