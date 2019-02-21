import { mysqlService } from './../../services/mysql.service';
import { ActivarRutaPage } from './../activar-ruta/activar-ruta';
import { ToastService } from './../../services/toast.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController, ToastController, Platform } from 'ionic-angular';
import {RutaModel} from '../../shared/ruta-model';
import {AddRutaPage} from '../add-ruta/add-ruta';
import { firebaseService } from '../../services/firebase.service';
import { AddrutaproPage } from '../addrutapro/addrutapro';
import { rutaprogramada } from '../../interfaces/ruta.programada.interface';
/**
 * Generated class for the ViajePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { ISubscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-viaje',
  templateUrl: 'viaje.html',
})
export class ViajePage {
  email='';
  vec:any=[];
  cacpacidad=0;
  placa;
  control1:ISubscription;
  //buscardor
  fecha;
  resultados=[];
  copia=[];
  public viajes:RutaModel[];



  id_usuario;
  id_auto;
  nombres=[];
  value=false;
  constructor(public navCtrl: NavController,
    public alertCtrl:AlertController, public toast:ToastService,public navParams: NavParams,
    public modalCtrl:ModalController,public mysql:mysqlService, public servicio:firebaseService,
    public viewCtrl:ViewController,private platform:Platform)
    {
      this.platform.registerBackButtonAction(() => {
        console.log('');
      },10000);

      this.id_auto=this.navParams.get('id_auto');
      this.id_usuario=this.navParams.get('id_usuario');

      this.listarProgramadas();

      this.fecha=this.dameFecha();
      this.copia=this.vec;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViajePage');
  }
  listarProgramadas(){
    let info;
    this.mysql.listarProgramadas(this.id_usuario).subscribe(
      data=>{
        console.log('data:',data);
        info=Object.assign(data);

      },(error)=>{
        console.log(error);

      }
    );
    setTimeout(()=>{
      let mensaje='';
      mensaje=info['message'];
      if(typeof mensaje != 'undefined')
      {
        if(mensaje=="No se encontro rutas_viaje")
          this.value=true;
      }else{
        this.vec=info;
      }
    },1000);

  }

  seleccinaRuta(){
    this.navCtrl.setRoot(AddrutaproPage,{id_usuario:this.id_usuario,id_auto:this.id_auto});
  }
  // En viaje.ts luego de de la funcion seleccionaRuta()
//funcion para eliminar rutas

borrarRutaAgendada(id_viaje){

   let alert = this.alertCtrl.create({
    title: 'Confirmar borrado',
    message: '¿Estás seguro de que deseas eliminar esta ruta?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        handler: () => {
          // Ha respondido que no así que no hacemos nada
        }
      },
      {
        text: 'Si',
        handler: () => {
             // AquÍ borramos el sitio en la base de datos
          /*for (let i = 0; i < integrantes.length; i++) {
            if (integrantes[i] != '')
              this.servicio.quitarSolicitudesIntegrantes(integrantes[i], rama);
          }
          this.servicio.eliminarRutaAgendada(nombre, correo, fecha, hora).then(
            () => {
              this.toast.show(` Ruta eliminada!`);
              this.navCtrl.setRoot(ViajePage, { email: this.email, placa: this.placa, capacidad: this.cacpacidad });
            }
      );*/
          this.mysql.EliminarRutaProgramada(id_viaje).subscribe(
            data=>{
              console.log(data);
              if(data['message']=='OK')
              {
                this.toast.show('Ruta eliminada!');
                this.navCtrl.setRoot(ViajePage,{id_usuario:this.id_usuario,id_auto:this.id_auto});
              }
            },(error)=>{
              console.log(error);

            }
          );

         }
      }
    ]
  });

  alert.present();

}

dameFecha()
{
  let hoy = new Date();
  let dd = hoy.getDate();
  let mm = hoy.getMonth()+1;
  let yyyy = hoy.getFullYear();
  let date=yyyy+'-'+mm+'-'+dd;
  return date;
}


filtrarporfecha()
{

  this.resultados=[]; //limpio

  for (let i = 0; i < this.copia.length; i++) {
    console.log(this.copia[i].fecha);

    if(this.copia[i].fecha==this.fecha)
      this.resultados.push(this.copia[i]);
  }
  console.log(this.resultados);
  this.vec=this.resultados;
}
verificarFecha(fecha_hora)
{
  let divisor=fecha_hora.split(' '); //2018-02-24 17:15:00
  let fecha=divisor[0].split('-'); //2018-10-20
  let hora=divisor[1].split(':'); //17:15:00
  let hoy = new Date();
  let dd = hoy.getDate();
  let mm = hoy.getMonth()+1;
  let yyyy = hoy.getFullYear();
  let date: Date = new Date();
  let hh = date.getHours();//obtiene horas del sistema
  let min = date.getMinutes();//obtiene minutos del sistema
  if(Number(min)<=10){
    hh = hh-1;
    min = min-10+60;
  }
  else{
    min = min-10;
  }
  if((Number(fecha[0])==yyyy) && (Number(fecha[1])==mm) && ((Number(fecha[2]))==dd+1))
  {
    //console.log('falta un dia');
    return 'falta un dia';
  }
  else
  {
    if(((Number(fecha[0])<yyyy) && (Number(fecha[1])<mm) && (Number(fecha[2])<dd))
    || ((Number(fecha[0])==yyyy) && (Number(fecha[1])==mm) && (Number(fecha[2])<dd))
    || ((Number(fecha[0])==yyyy) && (Number(fecha[1])<mm))
    || ((Number(fecha[0])<yyyy))
    || ((Number(hora[0])<=hh) && Number(hora[1]<=min))
    || ((Number(hora[0])==hh) && Number(hora[1]<=min)))
    {
      //console.log('pasado');
      return 'pasado';
    }
    else
    {
      if((Number(fecha[0])==yyyy) && (Number(fecha[1])==mm) && (Number(fecha[2])==dd))
      {
        //console.log('es hoy');
        return 'hoy';
      }
      else
      {
        if((Number(fecha[0])>yyyy) || (Number(fecha[1])>mm) || (Number(fecha[2])>dd+1))
        {
          //console.log('aun falta');
          return 'falta';
        }
      }
    }
  }


}


  activarRuta(ruta)
  {
    this.navCtrl.setRoot(ActivarRutaPage,{id_usuario:this.id_usuario,id_auto:this.id_auto, ruta:ruta});
  }
}
