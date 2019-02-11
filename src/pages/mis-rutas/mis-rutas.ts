import { ConfirmarEliminacionPage } from './../confirmar-eliminacion/confirmar-eliminacion';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, AlertController, ToastController, Platform } from 'ionic-angular';
import { ISubscription } from 'rxjs/Subscription';
import { RutaModel } from '../../shared/ruta-model';
import { firebaseService } from '../../services/firebase.service';
import { ToastService } from '../../services/toast.service';
import { OpcionesConductorPage } from '../opciones-conductor/opciones-conductor';

/**
 * Generated class for the MisRutasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mis-rutas',
  templateUrl: 'mis-rutas.html',
})
export class MisRutasPage {

  email='';
  vec:any=[];
  cacpacidad=0;
  control1:ISubscription;
  public viajes:RutaModel[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl:ModalController,public servicio:firebaseService,
    public viewCtrl:ViewController,public alertCtrl : AlertController, public toast: ToastService,private platform:Platform) {
      this.platform.registerBackButtonAction(() => {
        console.log('');
      },10000);
    this.email = this.navParams.get('email');
    this.cacpacidad = this.navParams.get('capacidad');
    console.log(this.email);
    this.func();
    setTimeout(()=>{
      this.control1.unsubscribe();
    },3000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViajePage');
  }
  func(){
    let aux;
    this.control1=this.servicio.getRuta(this.email).subscribe(
      (data)=>{
        console.log(data);
        for(aux of data)
        {
          console.log(aux);
            this.vec.push(aux);
          
        }
      }
    );
    console.log(this.vec);
  }
  rama;
  borrarRuta(ruta:any){
            this.navCtrl.setRoot(ConfirmarEliminacionPage,{email: this.email,ruta: ruta});

 }

}
