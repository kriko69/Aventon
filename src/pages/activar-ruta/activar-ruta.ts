import { VerMiRutaPage } from './../ver-mi-ruta/ver-mi-ruta';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController ,App, Platform} from 'ionic-angular';
import { firebaseService } from '../../services/firebase.service';

/**
 * Generated class for the ActivarRutaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activar-ruta',
  templateUrl: 'activar-ruta.html',
})
export class ActivarRutaPage {

  email;
  ruta;
  rama;
  ramaMiSolicitud;
  capacidad;
  placa;
  rutaprogramada=[];


  id_usuario;
  id_auto;
  constructor(public app:App,public navCtrl: NavController, public navParams: NavParams,
  public servicio:firebaseService, public alerta:AlertController,private platform:Platform) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.id_auto=this.navParams.get('id_auto');
    this.id_usuario=this.navParams.get('id_usuario');

    this.servicio.obtenerRuta(this.rama).valueChanges().subscribe(
      (data)=>{
        this.rutaprogramada=data;
        console.log(this.rutaprogramada);
      }
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivarRutaPage');
  }
  activar()
  {
    let integrantes=this.rutaprogramada[7].split(';');
    console.log(integrantes);
    console.log(this.ramaMiSolicitud);
    for(let i=0;i<integrantes.length;i++)
    {
      if(integrantes[i]!='')
        this.servicio.quitarSolicitudesIntegrantes(integrantes[i],this.ramaMiSolicitud);
    }
    this.servicio.quitarRuta(this.rama);
    let pet=this.email.split('.');
    let activa={
      email:this.email,
      alat:'',
      along:'',
    ruta:this.rutaprogramada[11],
    capacidad:this.rutaprogramada[2],
    precio:this.rutaprogramada[9],
    pasajeros:this.rutaprogramada[7],
    recogidas:this.rutaprogramada[10],
    zfecha:this.rutaprogramada[5]+'|'+this.rutaprogramada[6]
    };
    let splitemail=this.email.split('.');
    console.log(this.rutaprogramada[7]);
    console.log(splitemail[0]);

    this.enviarSolicitudes(this.rutaprogramada[7],splitemail[0]);

    this.servicio.agregarRutaActiva(pet[0],activa);
   // this.mostrarAlerta();
    //this.navCtrl.setRoot(VerMiRutaPage,{email:this.email,capacidad:this.capacidad,ruta:this.ruta.ruta});
    var nav = this.app.getRootNav();
    nav.setRoot(VerMiRutaPage,{email: this.email,capacidad:this.capacidad,ruta:this.ruta.ruta});
  }
  mostrarAlerta() {
    const alert = this.alerta.create({
      title: 'Ruta Activada!',
      subTitle: 'Ahora la ruta esta en modo activa',
      buttons: ['OK']
    });
    alert.present();
  }
  eliminarSolicitudes(pasajeros:string,rama:string)
  {
    let integrantes=pasajeros.split(';');
    console.log(integrantes);
    console.log(rama);
    for(let i=0;i<integrantes.length;i++)
    {
      this.servicio.quitarSolicitudesIntegrantes(integrantes[i],rama);
    }
  }
  enviarSolicitudes(pasajeros:string,conductor:string)
  {
    let integrantes=pasajeros.split(';');
    console.log(integrantes);
    for(let i=0;i<integrantes.length;i++)
    {
      if(integrantes[i]!='')
        this.servicio.enviarSolicitudesActiva(conductor,integrantes[i],this.ruta.fecha,this.ruta.hora);
    }
  }
}
