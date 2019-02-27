import { mysqlService } from './../../services/mysql.service';
import { VerMiRutaPage } from './../ver-mi-ruta/ver-mi-ruta';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController ,App, Platform} from 'ionic-angular';
import { firebaseService } from '../../services/firebase.service';
import { ViajePage } from '../viaje/viaje';

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
capacidad;
  rutaprogramada=[];
  id_usuario;
  id_auto;
  ruta;
  integrantes;
  fecha;
  constructor(public app:App,public navCtrl: NavController, public navParams: NavParams,
  public mysql:mysqlService, public alerta:AlertController,private platform:Platform) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.id_auto=this.navParams.get('id_auto');
    this.id_usuario=this.navParams.get('id_usuario');
    this.ruta=this.navParams.get('ruta');
    console.log('ruta:',this.ruta);
    this.fecha=this.dameFecha();



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivarRutaPage');
  }
  activar()
  {
    console.log("RUTAA",this.ruta);
    
    this.mysql.listarIntegrantesPorRuta(this.ruta.id_viaje).subscribe(
      data=>{
        console.log('integrantes',data);
        this.integrantes=data;

      },(error)=>{
        console.log(error);

      }
    );
    setTimeout(()=>{
      if(this.integrantes.message!="No se encontro integrantes"){
      console.log(this.integrantes);
      this.mysql.activarRuta(this.ruta.id_viaje).subscribe(
        data=>{
          console.log(data);

        },(error)=>{
          console.log(error);

        }
      );
        let estado='Activada';
        let mensaje='La Ruta ya fue activada!';
        this.fecha=this.dameFecha();
      for (let i = 0; i < this.integrantes.length; i++) {
        this.mysql.enviarSolicitudDeActivada(this.id_usuario,this.integrantes[i].ci,this.fecha,estado,mensaje,this.ruta.id_viaje).subscribe(
          data=>{
            console.log(data);
          },(error)=>{
            console.log(error);
          }
        );

      }
    }
    },2000);
    var nav = this.app.getRootNav();
    nav.setRoot(VerMiRutaPage,{id_usuario:this.id_usuario,id_auto:this.id_auto,ruta_activada:this.ruta});
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
    let date=yyyy+'-'+mm+'-'+dd+' '+hora+':'+minutos+':'+segundos;

    return date;
  }
  Cancelar(){
    this.navCtrl.setRoot(ViajePage,{id_usuario:this.id_usuario,id_auto:this.id_auto});
  }
}
