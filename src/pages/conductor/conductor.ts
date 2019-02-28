import { BuzonPage } from './../buzon/buzon';
import { ViajePage } from './../viaje/viaje';
import { MarkadorPage } from './../markador/markador';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';


/**
 * Generated class for the ConductorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { VehiculoPage } from '../vehiculo/vehiculo';
import { OpcionesConductorPage } from '../opciones-conductor/opciones-conductor';
import { ISubscription } from 'rxjs/Subscription';
import { ToastService } from '../../services/toast.service';
import { firebaseService } from '../../services/firebase.service';


@IonicPage()
@Component({
  selector: 'page-conductor',
  templateUrl: 'conductor.html',
})
export class ConductorPage {
  tab1:any;
  tab2:any;
  tab3:any;
  tab4:any;
  rootparamspage;
  subscription1:ISubscription;
  nuevas;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public servicio:firebaseService,public toast:ToastService,private platform:Platform) {
      this.platform.registerBackButtonAction(() => {
        console.log('');
      },10000);
    let id_usuario = navParams.get('id_usuario');//MODIFICADO PARA PASAR LOS PARAMETROS
    let id_auto=navParams.get('id_auto');
    this.rootparamspage={id_usuario: id_usuario,id_auto:id_auto};//MODIFICADO PARA PASAR LOS PARAMETROS
    //this.tab1 = MarkadorPage;
    this.tab2 = ViajePage;
    this.tab3=BuzonPage;
    this.tab4=OpcionesConductorPage;
    setTimeout(()=>{
        this.servicio.eliminarRutaActiva(id_usuario);
      },1000);
      let longi=[];
      let auuux:any;
    /*this.subscription1=this.servicio.getCantidadSolicitudesRef(id_usuario).valueChanges().subscribe(
      data=>{
        for( auuux of data){
          if(auuux.estado=='pendiente' || auuux.estado=='No Calificado')
        longi.push(data);
        }
      this.nuevas=longi.length;
      this.toast.solicitudes(longi.length);
      }
    );
    //si da un error con esto es porque en firebase no tenemos aun creada la rama solicitud
    setTimeout(()=>{
      this.subscription1.unsubscribe();
    },1000);*/
  }

  ionViewDidLoad() {
    let id_usuario = this.navParams.get('id_usuario');
    console.log(id_usuario);
  }

}
