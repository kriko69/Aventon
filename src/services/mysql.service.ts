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
      "telf":Usuario.telf,
      "tipo":Usuario.tipo
    };

    let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
    opsi   : any = JSON.stringify(data);
    console.log('opsi',opsi);



    return this.http.post('http://181.114.114.160/aventon/Procesos/insertar.php', opsi, header);
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

    return this.http.post('http://181.114.114.160/aventon/procesos/consulta.php', opsi, header);
  }
  //Cambiar tipo
  Tipo(id,tipo){
    let info=new Array();
    let data={
      "key":"editarUsuarioTipo",
      "ci":id,
      "tipo":tipo
    };

    let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
    opsi   : any = JSON.stringify(data);
    console.log('opsi',opsi);

     return this.http.post('http://181.114.114.160/aventon/procesos/actualizar.php', opsi, header);
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
      "ci":Number(id_usuario)
    };

    let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
    opsi   : any = JSON.stringify(data);
    console.log('opsi',opsi);

     return this.http.post('http://181.114.114.160/aventon/procesos/consulta.php', opsi, header);
    }

    ObtenerIdAuto(placa){
      let info=new Array();
      let data={
        "key":"obtenerIdAuto",
        "placa":placa
      };

      let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
      opsi   : any = JSON.stringify(data);
      console.log('opsi',opsi);

       return this.http.post('http://181.114.114.160/aventon/procesos/consulta.php', opsi, header);
      }
    Intermedia(id_usuario,id_auto){
      let info=new Array();
      let data={
        "key":"intermedia",
        "id_usuario":id_usuario,
        "id_auto":id_auto
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
      "maletera":Auto.maletera,
      "id_auto":Number(Auto.id_auto)
    };

    let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
    opsi   : any = JSON.stringify(data);
    console.log('opsi',opsi);

     return this.http.post('http://181.114.114.160/aventon/procesos/actualizar.php', opsi, header);
    }
  EliminarAuto(id_auto){
    let info=new Array();
      let data={
        "key":"eliminarAuto",
        "id_auto":id_auto
      };

      let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
      opsi   : any = JSON.stringify(data);
      console.log('opsi',opsi);

       return this.http.post('http://181.114.114.160/aventon/procesos/eliminar.php', opsi, header);
  }


  agregarRuta(id_usuario,nombre_ruta)
  {
    let data={
      "key":"agregarRuta",
      "id_usuario":id_usuario,
      "nombre_ruta":nombre_ruta
    };

    let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
    opsi   : any = JSON.stringify(data);
    console.log('opsi',opsi);

     return this.http.post('http://181.114.114.160/aventon/procesos/insertar.php', opsi, header);
  }


  obtenerIdRuta(nombre_ruta)
  {
    let data={
      "key":"obtenerIdRuta",
      "nombre_ruta":nombre_ruta
    };

    let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
    opsi   : any = JSON.stringify(data);
    console.log('opsi',opsi);

     return this.http.post('http://181.114.114.160/aventon/procesos/consulta.php', opsi, header);
  }

  agregarPunto(id_ruta,latitud,longitud)
  {
    let data={
      "key":"agregarPunto",
      "id_ruta":id_ruta,
      "latitud":latitud,
      "longitud":longitud
    };

    let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
    opsi   : any = JSON.stringify(data);
    console.log('opsi',opsi);

     return this.http.post('http://181.114.114.160/aventon/procesos/insertar.php', opsi, header);
  }




  //Ruta_Viaje
  listarRuta_viaje(estado){
    let info=new Array();
    let data={
      "key":"listarRuta_viaje",
      "estado":estado
    };

    let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
    opsi   : any = JSON.stringify(data);
    console.log('opsi',opsi);

     return this.http.post('http://181.114.114.160/aventon/procesos/consulta.php', opsi, header);
    }

    //Solicitudes
    listarSolicitudes(ci,estado){
      let info=new Array();
      let data={
        "key":"listarSolicitudes",
        "ci":ci,
        "estado":estado
      };

      let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
      opsi   : any = JSON.stringify(data);
      console.log('opsi',opsi);

       return this.http.post('http://181.114.114.160/aventon/procesos/consulta.php', opsi, header);
      }
}
