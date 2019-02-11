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
  constructor(public navCtrl: NavController,
    public alertCtrl:AlertController, public toast:ToastService,public navParams: NavParams,
    public modalCtrl:ModalController,public servicio:firebaseService,
    public viewCtrl:ViewController,private platform:Platform) {
      this.platform.registerBackButtonAction(() => {
        console.log('');
      },10000);
    this.email = this.navParams.get('email');
    this.cacpacidad = this.navParams.get('capacidad');
    this.placa=navParams.get('placa');
    console.log(this.email);
    this.func();
    setTimeout(()=>{
      this.control1.unsubscribe();
    },3000);
    this.fecha=this.dameFecha();
    this.copia=this.vec;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViajePage');
  }
  func(){
    let aux;
    this.control1=this.servicio.getRutasPro().valueChanges().subscribe(
      data=>{
        for(aux of data)
        {
          if(aux.correo==this.email)
          {
            console.log(aux);
            this.vec.push(aux);
          }
        }
        console.log(this.vec);
      }
    );
  }
  seleccinaRuta(){
    this.navCtrl.setRoot(AddrutaproPage,{email:this.email,capacidad:this.cacpacidad,placa:this.placa});
  }
  // En viaje.ts luego de de la funcion seleccionaRuta()
//funcion para eliminar rutas

borrarRutaAgendada(nombre,correo,fecha,hora,pasajeros){

  let aux=this.email.split('.');
  let rama=aux[0]+fecha+hora;
  let integrantes=pasajeros.split(';');
  


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
          for (let i = 0; i < integrantes.length; i++) {
            if (integrantes[i] != '')
              this.servicio.quitarSolicitudesIntegrantes(integrantes[i], rama);
          }
          this.servicio.eliminarRutaAgendada(nombre, correo, fecha, hora).then(
            () => {
              this.toast.show(` Ruta eliminada!`);
              this.navCtrl.setRoot(ViajePage, { email: this.email, placa: this.placa, capacidad: this.cacpacidad });
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
verificarFecha(fecha)
{
  let divisor=fecha.split('-'); //2018-10-20
  let hoy = new Date();
  let dd = hoy.getDate();
  let mm = hoy.getMonth()+1;
  let yyyy = hoy.getFullYear();
  if((Number(divisor[0])==yyyy) && (Number(divisor[1])==mm) && ((Number(divisor[2]))==dd+1))
  {
    //console.log('falta un dia');
    return 'falta un dia';
  }
  else
  {
    if(((Number(divisor[0])<yyyy) && (Number(divisor[1])<mm) && (Number(divisor[2])<dd))
    || ((Number(divisor[0])==yyyy) && (Number(divisor[1])==mm) && (Number(divisor[2])<dd))
    || ((Number(divisor[0])==yyyy) && (Number(divisor[1])<mm))
    || ((Number(divisor[0])<yyyy)))
    {
      //console.log('pasado');
      return 'pasado';
    }
    else
    {
      if((Number(divisor[0])==yyyy) && (Number(divisor[1])==mm) && (Number(divisor[2])==dd))
      {
        //console.log('es hoy');
        return 'hoy';
      }
      else
      {
        if((Number(divisor[0])>yyyy) || (Number(divisor[1])>mm) || (Number(divisor[2])>dd+1))
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
    this.navCtrl.push(ActivarRutaPage,{email:this.email,ruta:ruta,capacidad:this.cacpacidad,placa:this.placa})
  }
}
