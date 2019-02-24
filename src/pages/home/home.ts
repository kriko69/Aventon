import { Component } from '@angular/core';
import { NavController,NavParams, Platform } from 'ionic-angular';
import { Ionic2RatingModule } from "ionic2-rating";
import { firebaseService } from './../../services/firebase.service';
import { BuzonPasajeroPage } from '../buzon-pasajero/buzon-pasajero';
import { mysqlService } from '../../services/mysql.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  rate : any = 0;
  obj:any;
  id_usuario;
  problemas='';
  califi={
    id_de: 0,
    id_para:0,
    rol:'Conductor',
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
    this.obj=this.navParams.get('obj');
  }

  onModelChange(event){
  	this.rate = event;
  	console.log(event);
  }
  calif(){
    let estado='Calificado';
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
      this.califi.id_de=this.obj.id_de;
      this.califi.id_para=this.obj.id_para;
      this.califi.rol='Conductor';
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
      },1000);
    },1000);
    this.navCtrl.setRoot(BuzonPasajeroPage,{id_usuario:this.id_usuario});
  }
}