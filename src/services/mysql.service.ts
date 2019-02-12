import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";



@Injectable()
export class mysqlService{

  ServidorUrl='http://181.114.114.160/aventon/procesos/';

  constructor(public http:HttpClient){

  }

  AgregarUsuario(Usuario):Observable<any>
  {
    let data={
      "key":"registrarUsuario",
      "ci":Usuario.carnet,
      "pass":Usuario.pass1,
      "nombre":Usuario.nombre,
      "apellido":Usuario.apellido,
      "fecha_nac":Usuario.fecha_nac,
      "telf":Usuario.telf
    };

    let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
    opsi   : any = JSON.stringify(data);
    console.log('opsi',opsi);



    return this.http.post('http://181.114.114.160/aventon/procesos/insertar.php', opsi, header);/*.subscribe(
      data => {
        console.log('data', data);

        console.log('exito');


        }, (error: any)=> {
          console.log('error', error);

    });

    //return info;*/
  }

  ValidarrUsuario(Usuario)

  ValidarrUsuario(Usuario):Observable<any>
  {
    let data={
      "key":"verificarExistenciaDeUsuarioPorCi",
      "ci":Usuario.carnet,
      "pass":Usuario.password
    };

    let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
    opsi   : any = JSON.stringify(data);
    console.log('opsi',opsi);

    return this.http.post('http://181.114.114.160/aventon/procesos/consulta.php', opsi, header);/*.subscribe(
      data => {
        console.log('data',data);
        console.log('exito');


        }, (error: any)=> {
          console.log('error', error);

    });
    //return info;*/
  }
  
   //Autos
   AgregarAuto(Auto)

  AgregarAuto(Auto):Observable<any>
  {
    let info=new Array();
    let data={
      "key":"registrarAuto",
      "placa":Auto.placa,
      "marca":Auto.marca,
      "modelo":Auto.modelo,
      "color":Auto.color,
      "estado":Auto.estado,
      "capacidad":Auto.capacidad,
      "maletera":Auto.maletera
    };

    let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
    opsi   : any = JSON.stringify(data);
    console.log('opsi',opsi);

     return this.http.post('http://181.114.114.160/aventon/procesos/insertar.php', opsi, header);/*.subscribe(
      data => {
        console.log('data',data);
        info["mensaje"]=data['message'];

        console.log('exito');


        }, (error: any)=> {
          console.log('error', error);

    });
    //return info;*/
  }
  GetAutos(id_usuario){
    let info=new Array();
    let data={
      "key":"listarAutos",
      "ci":id_usuario
    };

    let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
    opsi   : any = JSON.stringify(data);
    console.log('opsi',opsi);

     return this.http.post('http://181.114.114.160/aventon/procesos/consulta.php', opsi, header);
    }
    Intermedia(auto){
      let info=new Array();
      let data={
        "key":"intermedia",
        "ci":auto.id_usuario,
        "placa":auto.placa
      };
  
      let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
      opsi   : any = JSON.stringify(data);
      console.log('opsi',opsi);
  
       return this.http.post('http://181.114.114.160/aventon/procesos/insertar.php', opsi, header);
      }
  UpdateAutos(Auto){
    let info=new Array();
    let data={
      "key":"editarAuto",
      "placa":Auto.placa,
      "marca":Auto.marca,
      "modelo":Auto.modelo,
      "color":Auto.color,
      "capacidad":Auto.capacidad,
      "maletera":Auto.maletera
    };

    let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
    opsi   : any = JSON.stringify(data);
    console.log('opsi',opsi);

     return this.http.post('http://181.114.114.160/aventon/procesos/actualizar.php', opsi, header);
    }
  EliminarAuto(Auto){}
}
