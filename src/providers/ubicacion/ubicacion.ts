import { Usuario } from './../../interfaces/usuario.interface';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import{AngularFireList, AngularFireDatabase}  from 'angularfire2/database';
import { mysqlService } from '../../services/mysql.service';

@Injectable()
export class UbicacionService {
  usuario={alat:0,along:0};
  watchId;
  watchId1;
  bool=true;
  constructor(private geolocation:Geolocation,public af:AngularFireDatabase,public mysql:mysqlService) {
    console.log('Hello UbicacionProvider Provider');
  }
  iniciar_localizacion(id_viaje){
this.watchId = navigator.geolocation.watchPosition((data) => {
  this.usuario.alat=data.coords.latitude;
  this.usuario.along=data.coords.longitude;
  setTimeout(() => {
  this.mysql.actualizarLocaclizacion(this.usuario.alat,this.usuario.along,id_viaje).subscribe(
    data=>{
      console.log('data:',data);

    },(error)=>{
      console.log(error);

    }
  );
  }, 5000);
})
  }
  cortar_localizacion(){
    navigator.geolocation.clearWatch(this.watchId);
  }
}
