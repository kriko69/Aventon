import { Usuario } from './../../interfaces/usuario.interface';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import{AngularFireList, AngularFireDatabase}  from 'angularfire2/database';

@Injectable()
export class UbicacionService {
  usuario={alat:0,along:0};
  watchId;
  watchId1;
  bool=true;
  constructor(private geolocation:Geolocation,public af:AngularFireDatabase) {
    console.log('Hello UbicacionProvider Provider');
  }
  iniciar_localizacion(email:string){
    let aux=email.split('.');
    if(this.bool){
      this.watchId1 = navigator.geolocation.watchPosition((data) => {
        this.usuario.alat=data.coords.latitude;
        this.usuario.along=data.coords.longitude;
        setTimeout(() => {
        this.af.database.ref('RutaActiva/'+aux[0]+'/').update(this.usuario);
        setTimeout(() => {
          navigator.geolocation.clearWatch(this.watchId1);
          }, 1000);
        }, 1000);
      })
      this.bool=false;
    }
this.watchId = navigator.geolocation.watchPosition((data) => {
  this.usuario.alat=data.coords.latitude;
  this.usuario.along=data.coords.longitude;
  setTimeout(() => {
  this.af.database.ref('RutaActiva/'+aux[0]+'/').update(this.usuario);
  }, 5000);
})
  }
  cortar_localizacion(){
    navigator.geolocation.clearWatch(this.watchId);
  }
}
