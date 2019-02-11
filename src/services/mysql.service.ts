import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";



@Injectable()
export class mysqlService{

  ServidorUrl='http://181.114.114.160/aventon/procesos/';

  constructor(public http:HttpClient){

  }

  AgregarUsuario(Usuario)
  {
    let info=new Array();
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

    this.http.post('http://181.114.114.160/aventon/procesos/insertar.php', opsi, header).subscribe(
      data => {
        console.log('data',data);
        info["mensaje"]=data['message'];
        info["nombre"]=data['nombre'];

        console.log('exito');


        }, (error: any)=> {
          console.log('error', error);

    });
    //return info;
  }


  ValidarrUsuario(Usuario)
  {
    let data={
      "key":"validarUsuario",
      "ci":Usuario.carnet,
      "pass":Usuario.password
    };

    let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
    opsi   : any = JSON.stringify(data);
    console.log('opsi',opsi);

    this.http.post('http://181.114.114.160/aventon/procesos/consulta.php', opsi, header).subscribe(
      data => {
        console.log('data',data);
        console.log('exito');


        }, (error: any)=> {
          console.log('error', error);

    });
    //return info;
  }
}
