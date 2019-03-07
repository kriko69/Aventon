import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { firebaseService } from './../../services/firebase.service';
import { BuzonPage } from '../buzon/buzon';
import { solicitud } from '../../interfaces/solicitud';
import { mysqlService } from '../../services/mysql.service';

/**
 * Generated class for the CalificacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calificacion',
  templateUrl: 'calificacion.html',
})
export class CalificacionPage {
  rate : any = 0;
  obj:any;
  id_usuario;
  id_auto;
  problemas='';
  califi={
    id_de: 0,
    id_para:0,
    rol:'Pasajero',
    calificacion:0,
    problemas:'',
    id_viaje:0
  };
  constructor(public navCtrl: NavController,public navParams: NavParams,public servicio:firebaseService,private platform:Platform,
    public mysql:mysqlService) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.id_usuario = this.navParams.get('id_usuario');
    this.id_auto = this.navParams.get('id_auto');
    this.obj=this.navParams.get('obj');
  }

  onModelChange(event){
  	this.rate = event;
  	console.log(event);
  }
  calif(){
    let estado='Calificado C';
    let info;
    this.mysql.actualizarEstadoSolicitud(estado,this.obj.id_solicitud).subscribe(
      data => {
        console.log('data',data);
        console.log('exito');
        info=Object.assign(data);

        }, (error: any)=> {
          console.log('error', error);

        }
    );
    setTimeout(()=>{
      console.log(info);
      this.califi.id_de=this.obj.id_para;
      this.califi.id_para=this.obj.id_de;
      this.califi.rol='Pasajero';
      this.califi.calificacion=this.rate;
      this.califi.problemas=this.problemas;
      this.califi.id_viaje=this.obj.id_viaje;
      this.mysql.insertarcalificacion(this.califi).subscribe(
        data => {
          console.log('data',data);
          console.log('exito');
          info=Object.assign(data);
  
          }, (error: any)=> {
            console.log('error', error);
  
          }
      );
      setTimeout(()=>{
        console.log(info);
        this.navCtrl.setRoot(BuzonPage,{id_usuario:this.id_usuario,id_auto:this.id_auto});
      },1000);
    },1000);
  }
}