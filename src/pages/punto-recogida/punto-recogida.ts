import { HomePasajeroPage } from './../home-pasajero/home-pasajero';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Vestimenta1Page } from '../vestimenta1/vestimenta1';

declare var google: any;
/**
 * Generated class for the PuntoRecogidaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-punto-recogida',
  templateUrl: 'punto-recogida.html',
})
export class PuntoRecogidaPage {

  map: any;
  markeraux:any;
  latOri  = -16.503720;
  longOri = -68.131247;
  email='';

  constructor(public navCtrl: NavController, public navParams: NavParams,public geolocation: Geolocation,private platform:Platform,
    public alerta:AlertController) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.email = this.navParams.get('email');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PuntoRecogidaPage');
    this.geolocation.getCurrentPosition().then((result) => {
      this.latOri = result.coords.latitude;
      this.longOri = result.coords.longitude;
    }).catch(function(e) {
      console.log('2-error')
      alert('GPS desativado. Verifique!')
    });
    this.loadMap(this.latOri,this.longOri);
  }
  private loadMap(latOri, lngOri) {
          var directionsDisplay = new google.maps.DirectionsRenderer;
         directionsDisplay = new google.maps.DirectionsRenderer();
         this.map = new google.maps.Map(document.getElementById('map'), {
           center: {lat: latOri, lng: lngOri},
           zoom:15
         });
         var miposicion = {lat: latOri, lng: lngOri};
         this.markeraux = new google.maps.Marker({position: miposicion,map: this.map,draggable: true});
         directionsDisplay.setMap(this.map);
       }
       aceptar(){
         let latitud=this.markeraux.getPosition().lat();
         let longitud=this.markeraux.getPosition().lng();
         var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap(null);
        var request = {
          origin: new google.maps.LatLng(latitud,longitud),
          destination: new google.maps.LatLng(this.latOri,this.longOri),
          travelMode: 'DRIVING'
        };
        let prohibido;
        let alert1=this.alerta;
        let control=this.navCtrl;
        let correo=this.email;
        directionsService.route(request, function(result, status) {
          if (status == 'OK') {
            directionsDisplay.setDirections(result);
            //console.log('mi punto',directionsDisplay.getDirections());
            console.log(directionsDisplay.getDirections().routes[0].legs[0].start_address);
            if(directionsDisplay.getDirections().routes[0].legs[0].start_address.search('Costanera')!=-1 ||
               directionsDisplay.getDirections().routes[0].legs[0].start_address.search('Costanerita')!=-1 ||
               directionsDisplay.getDirections().routes[0].legs[0].start_address.search('Kantutani')!=-1)
               prohibido=true;
            else
            prohibido=false;

          }
          console.log(prohibido);

          if(prohibido)
          {
            const alert = alert1.create({
              title: 'Punto Prohibido',
              subTitle: 'Este punto no puede ser definido por seguridad.',
              buttons: ['OK']
            });
            alert.present();
            control.setRoot(PuntoRecogidaPage,{email:correo});
          }
        });
         this.navCtrl.setRoot(Vestimenta1Page,{email: this.email,latitud:latitud,longitud:longitud});
       }
       posicion(){
        this.geolocation.getCurrentPosition().then((result) => {
          this.latOri = result.coords.latitude;
          this.longOri = result.coords.longitude;
        }).catch(function(e) {
          console.log('2-error')
          alert('GPS desativado. Verifique!')
        });

    this.loadMap(this.latOri,this.longOri);
       }
}
