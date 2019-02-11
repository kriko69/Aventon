import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { firebaseService } from './../../services/firebase.service';
import { BuzonPage } from '../buzon/buzon';
import { solicitud } from '../../interfaces/solicitud';

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
  obj2=[];
  email;
  cant;
  constructor(public navCtrl: NavController,public navParams: NavParams,public servicio:firebaseService,private platform:Platform) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.email = this.navParams.get('email');
    this.obj=this.navParams.get('obj');

    let aux=this.obj.emails.split(';');
    
    this.cant=aux.length;
    
    for(let i=0;i<this.cant;i++){
      console.log(aux[i]);
      let varia={
        email:'',
        fecha:'',
        calificacion:0
    }
    if(aux[i]!='' && aux[i]!=' ' && aux[i]!=null){
      varia.email=aux[i];
      varia.fecha=this.obj.fecha;
      varia.calificacion=0;
      this.obj2.push(varia);
    }
    }
    console.log(this.obj2);
    
  }

  onModelChange(event,item){
  	item.calificacion = event;
  	console.log(event);
  }
  calif(){
   console.log(this.obj2);
    for(let i=0;i<this.obj2.length;i++){
      let mio=this.email.split('.');
      let tuyo=this.obj2[i].email.split('.');
      this.servicio.calif2(mio[0],tuyo[0],this.obj2[i].calificacion,this.obj2[i].fecha);
    }
    this.obj.estado='Calificado';
    this.servicio.upca1(this.email,this.obj);
    this.navCtrl.setRoot(BuzonPage,{email:this.email});
  }
}