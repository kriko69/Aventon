import { mysqlService } from './../../services/mysql.service';
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
  fechahora;
  vec:any;
  placa;
  paga=true;

  id_usuario;
  id_auto;
  capacidad;
  constructor(public navCtrl: NavController, public navParams: NavParams,public mysql:mysqlService,
    public viewCtrl:ViewController,public toast: ToastService,private platform:Platform) {
      this.platform.registerBackButtonAction(() => {
        console.log('');
      },10000);
      this.id_auto=this.navParams.get('id_auto');
      this.id_usuario=this.navParams.get('id_usuario');
      console.log(this.dameFecha());
      this.fechahora=this.dameFecha();

  }

  ionViewDidLoad() {
    this.func();
  }
  func(){
    let info;
    this.mysql.listarRutasParaProgramar(this.id_usuario).subscribe(
      data=>{
        console.log('nombre rutas: ',data);
        info=data;
        console.log('vec',this.vec);

      },(error)=>{
        console.log(error);

      }
    );setTimeout(() => {
      if(info['message']=='No se encontro rutas con este ci' || info==undefined)
        this.vec=[];
      else{
        this.vec=info;
      }
      
    }, 1000);
  }
  submit(ruta){
    let divisor1=this.fechahora.split('T');
    let fecha=divisor1[0];
    let divisor2=divisor1[1].split('Z');
    let hora=divisor2[0];
    this.mysql.obtenerCapacidadAuto(this.id_auto).subscribe(
      data=>{
        console.log(data);
        this.capacidad=data;
      },(error)=>{
        console.log(error);

      }
    );
    setTimeout(()=>{
      let programada={
        'id_auto':Number(this.id_auto),
        'capacidad':Number(this.capacidad),
        'fecha_hora':fecha+' '+hora,
        'id_ruta':Number(ruta.id_ruta),
        'id_conductor':Number(this.id_usuario)
      };
      console.log(programada);
      this.mysql.agregarRutaProgramada(programada).subscribe(
        data=>{
          console.log(data);
          if(data['message']=='OK')
          {
            this.toast.show(` Ruta agendada!`);
            this.navCtrl.setRoot(ViajePage,{id_usuario:this.id_usuario,id_auto:this.id_auto});
          }
        },(error)=>{
          console.log(error);

        }
      );

    },1000);


    /*
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
            this.navCtrl.setRoot(ViajePage,{id_usuario:this.id_usuario,id_auto:this.id_auto});
          }
        );;
      }
    );*/
  }
  dismiss(){
    this.navCtrl.setRoot(ViajePage,{id_usuario:this.id_usuario,id_auto:this.id_auto});
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
