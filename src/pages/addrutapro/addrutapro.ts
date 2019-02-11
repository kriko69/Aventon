import { ViajePage } from './../viaje/viaje';
import { rutaprogramada } from './../../interfaces/ruta.programada.interface';
import { firebaseService } from './../../services/firebase.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { Ruta } from '../../interfaces/rutas.interface';
import { ISubscription } from 'rxjs/Subscription';
import { ToastService } from '../../services/toast.service';

/**
 * Generated class for the AddrutaproPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addrutapro',
  templateUrl: 'addrutapro.html',
})
export class AddrutaproPage {
  email='';
  aux:any;
  control1:ISubscription;
  capacidad=0;
  fechahora;
  vec:any;
  placa;
  paga=true;
  constructor(public navCtrl: NavController, public navParams: NavParams,public servicio:firebaseService,
    public viewCtrl:ViewController,public toast: ToastService,private platform:Platform) {
      this.platform.registerBackButtonAction(() => {
        console.log('');
      },10000);
      this.email = this.navParams.get('email');
      this.capacidad= this.navParams.get('capacidad');
      this.placa=navParams.get('placa');
      console.log(this.capacidad);
      console.log(this.placa);
      console.log(this.dameFecha());
      this.fechahora=this.dameFecha();

  }

  ionViewDidLoad() {
    this.func();
  }
  func(){
    this.vec=this.servicio.getRuta(this.email);
  }
  submit(ruta:Ruta){
    console.log(this.fechahora);

    let t=this.fechahora.split('T');
    let tt=t[1];
    let ttt=tt.split('Z');
    tt=ttt[0];
    ttt=tt.split(':');
    let auux=ttt[0]+':'+ttt[1];if(this.paga==false){
      ruta.precio=0;
    }
    let rutapro:rutaprogramada={
      correo:ruta.correousuario,
      ruta:ruta.puntos,
      fecha:t[0],
      nombre:ruta.nombre,
      hora:auux,
      capacidad: Number(this.capacidad),
      conductor:'',
      calificacion:0,
      auto:ruta.placa,
      precio:ruta.precio,
      integrantes:'',
      puntosRecogidas:''
    };
    console.log(rutapro);

    this.control1=this.servicio.getUsuario(this.email).valueChanges().subscribe(
      data=>{
        console.log(data);
        rutapro.conductor=''+data[9];
        rutapro.calificacion=Number(data[1]);
        console.log(rutapro);
        this.servicio.setRutaPro(rutapro).then(
          ()=>{
            this.control1.unsubscribe();
            this.toast.show(` Ruta agendada!`);
            this.navCtrl.setRoot(ViajePage,{email: this.email,capacidad:this.capacidad,placa:this.placa});
          }
        );;
      }
    );
  }
  dismiss(){
    this.navCtrl.setRoot(ViajePage,{email: this.email,capacidad:this.capacidad,placa:this.placa});
  }

  dameFecha()
  {
    let hoy = new Date();
    let dd = hoy.getDate();
    let mm = hoy.getMonth()+1;
    let yyyy = hoy.getFullYear();
    let hora=''+hoy.getHours();
    let minutos=''+hoy.getMinutes();
    let segundos=''+hoy.getSeconds();
    if(hoy.getHours()<10)
      hora='0'+hora;
    if(hoy.getMinutes()<10)
      minutos='0'+minutos;
    if(hoy.getSeconds()<10)
      segundos='0'+segundos;
    //let date=dd+'-'+mm+'-'+yyyy+'T'+hora+':'+minutos+':'+segundos+'Z';
    let date=yyyy+'-'+mm+'-'+dd+'T'+hora+':'+minutos+':'+segundos+'Z';

    return date;
  }
}
