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
  email;
  rama;
  solicitudes;
  id_usuario;
  id_auto;
  value=false;
  info;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public myysql:mysqlService ,private platform:Platform) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.id_usuario=this.navParams.get('id_usuario');
    this.id_auto=this.navParams.get('id_auto');

    this.myysql.listarSolicitudesConductor(this.id_usuario).subscribe(
      data=>{
        if(data['message']=='No se encontró'){
          this.value=true;
        }
        else{
          this.solicitudes=data;
          console.log(this.solicitudes);
        }
      },(error)=>{
        console.log(error);

      }
    );

    /*this.servicio.getSolicitudesRef(this.rama[0]).valueChanges().subscribe(
      data=>{
        this.solicitudes=data;
        console.log(this.solicitudes);

      }
    );
    for(let i=0;i<this.solicitudes.length;i++)
    {
      if(this.solicitudes[i].emails=='')
      {
        this.solicitudes.splice(i, 1);
      }
    }*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuzonPage');
  }

  aceptar(solicitud)
  {
    this.navCtrl.push(AceptarSolicitudPage,{email:this.email,solicitud:solicitud});
  }
  calif(obj)
  {
    this.navCtrl.push(CalificacionPage,{email:this.email,obj:obj,rama:this.rama});
  }
}
