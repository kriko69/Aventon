import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";



@Injectable()
export class mysqlService{
  //ServidorUrl='http://181.114.114.160/aventon/Procesos/';
  ServidorUrl='http://jauzled.com/Procesos/';


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
      "tipo":Usuario.tipo,
      "calif_pasa":Usuario.calif_pasa,
      "calif_cond":Usuario.calif_cond
    };

    let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
    opsi   : any = JSON.stringify(data);
    console.log('opsi',opsi);
    return this.http.post(''+this.ServidorUrl+'insertar.php', opsi, header);
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

    return this.http.post(this.ServidorUrl+'consulta.php', opsi, header);
  }
  GetUsuario(ci){
    let data={
      "key":"obtenerUsuario",
      "ci":ci
    };

    let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
    opsi   : any = JSON.stringify(data);
    console.log('opsi',opsi);

    return this.http.post(this.ServidorUrl+'consulta.php', opsi, header);
  }
  EditarUser(usuario){
    let info=new Array();
    let data={
      "key":"editarUsuario",
      "ci":usuario.ci,
      "nombre":usuario.nombre,
      "apellido":usuario.apellido,
      "telf":usuario.telf,
      "fecha_nac":usuario.fecha_nac
    };

    let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
    opsi   : any = JSON.stringify(data);
    console.log('opsi',opsi);

     return this.http.post(this.ServidorUrl+'actualizar.php', opsi, header);
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

     return this.http.post(this.ServidorUrl+'actualizar.php', opsi, header);
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

     return this.http.post(this.ServidorUrl+'insertar.php', opsi, header);/*.subscribe(
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

     return this.http.post(this.ServidorUrl+'consulta.php', opsi, header);
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

       return this.http.post(this.ServidorUrl+'consulta.php', opsi, header);
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

       return this.http.post(this.ServidorUrl+'insertar.php', opsi, header);
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

     return this.http.post(this.ServidorUrl+'actualizar.php', opsi, header);
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

       return this.http.post(this.ServidorUrl+'eliminar.php', opsi, header);
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

     return this.http.post(this.ServidorUrl+'insertar.php', opsi, header);
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

     return this.http.post(this.ServidorUrl+'consulta.php', opsi, header);
  }

  agregarPunto(id_ruta,latitud,longitud,posicion)
  {
    let data={
      "key":"agregarPunto",
      "id_ruta":id_ruta,
      "latitud":latitud,
      "longitud":longitud,
      "posicion":posicion
    };

    let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
    opsi   : any = JSON.stringify(data);
    console.log('opsi',opsi);

     return this.http.post(this.ServidorUrl+'insertar.php', opsi, header);
  }

  listarRutas(id_usuario){
    let info=new Array();
    let data={
      "key":"listarRutas",
      "id_usuario":Number(id_usuario)
    };

    let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
    opsi   : any = JSON.stringify(data);
    console.log('opsi',opsi);

     return this.http.post(this.ServidorUrl+'consulta.php', opsi, header);
    }

    listarRutasParaEliminar(id_usuario){
      let info=new Array();
      let data={
        "key":"listarRutasParaEliminar",
        "id_usuario":Number(id_usuario)
      };

      let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
      opsi   : any = JSON.stringify(data);
      console.log('opsi',opsi);

       return this.http.post(this.ServidorUrl+'consulta.php', opsi, header);
      }

    listarRutasParaProgramar(id_usuario){
      let info=new Array();
      let data={
        "key":"listarRutasParaProgramar",
        "id_usuario":Number(id_usuario)
      };

      let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
      opsi   : any = JSON.stringify(data);
      console.log('opsi',opsi);

       return this.http.post(this.ServidorUrl+'consulta.php', opsi, header);
      }

    obtenerPuntosDeRuta(nombre_ruta,id_usuario)
    {
      let info=new Array();
      let data={
        "key":"listarPuntos",
        "id_usuario":Number(id_usuario),
        "nombre_ruta":nombre_ruta
      };

      let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
      opsi   : any = JSON.stringify(data);
      console.log('opsi',opsi);

      return this.http.post(this.ServidorUrl+'consulta.php', opsi, header);
    }

    listarProgramadas(id_usuario)
    {
      let info=new Array();
      let data={
        "key":"listarRuta_viaje",
        "id_usuario":Number(id_usuario)
      };

      let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
      opsi   : any = JSON.stringify(data);
      console.log('opsi',opsi);

      return this.http.post(this.ServidorUrl+'consulta.php', opsi, header);
    }


    obtenerCapacidadAuto(id_auto)
  {
    let data={
      "key":"obtenerCapacidadAuto",
      "id_auto":Number(id_auto)
    };

    let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
    opsi   : any = JSON.stringify(data);
    console.log('opsi',opsi);

     return this.http.post(this.ServidorUrl+'consulta.php', opsi, header);
  }


  agregarRutaProgramada(programada)
  {
    let data={
      "key":"agregarRutaProgramada",
      'id_auto':Number(programada.id_auto),
      'capacidad':Number(programada.capacidad),
      'fecha_hora':programada.fecha_hora,
      'id_ruta':Number(programada.id_ruta),
      'estado':'programada',
      'latitud':0,
      'longitud':0,
      'id_conductor':Number(programada.id_conductor)
    };

    let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
    opsi   : any = JSON.stringify(data);
    console.log('opsi',opsi);

     return this.http.post(this.ServidorUrl+'insertar.php', opsi, header);
  }

  EliminarRutaProgramada(id_viaje){
    let info=new Array();
      let data={
        "key":"EliminarRutaProgramada",
        "id_viaje":id_viaje
      };

      let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
      opsi   : any = JSON.stringify(data);
      console.log('opsi',opsi);

       return this.http.post(this.ServidorUrl+'eliminar.php', opsi, header);
  }

  EliminarRuta(id_ruta){
    let info=new Array();
      let data={
        "key":"EliminarRuta",
        "id_ruta":id_ruta
      };

      let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
      opsi   : any = JSON.stringify(data);
      console.log('opsi',opsi);

       return this.http.post(this.ServidorUrl+'eliminar.php', opsi, header);
  }


  listarIntegrantesPorRuta(id_viaje){
    let info=new Array();
  let data={
    "key":"listarIntegrantesPorRuta",
    "id_viaje":id_viaje
  };

  let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
  opsi   : any = JSON.stringify(data);
  console.log('opsi',opsi);

   return this.http.post(this.ServidorUrl+'consulta.php', opsi, header);
  }


  activarRuta(id_viaje){
    let info=new Array();
    let data={
      "key":"activarRuta",
      "id_viaje":id_viaje
    };

    let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
    opsi   : any = JSON.stringify(data);
    console.log('opsi',opsi);

     return this.http.post(this.ServidorUrl+'actualizar.php', opsi, header);
    }

    enviarSolicitudDeActivada(id_para,id_de,fecha,estado,mensaje,id_viaje)
    {
      let data={
        "key":"enviarSolicitudDeActivada",
        "id_de":id_de,
        "id_para":id_para,
        "fecha":fecha,
        "estado":estado,
        "mensaje":mensaje,
        "id_viaje":id_viaje
      };

      let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
      opsi   : any = JSON.stringify(data);
      console.log('opsi',opsi);
      
      return this.http.post(this.ServidorUrl+'actualizar.php', opsi, header);
    }

    listarSolicitudesConductor(id_usuario){
      let info=new Array();
    let data={
      "key":"listarSolicitudesConductor",
      "id_usuario":id_usuario
    };

    let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
    opsi   : any = JSON.stringify(data);
    console.log('opsi',opsi);

     return this.http.post(this.ServidorUrl+'consulta.php', opsi, header);
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

     return this.http.post(this.ServidorUrl+'consulta.php', opsi, header);
    }


    //Solicitudes
    listarSolicitudesPasajero(ci){
      let info=new Array();
      let data={
        "key":"listarSolicitudesPasajero",
        "ci":ci
      };

      let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
      opsi   : any = JSON.stringify(data);
      console.log('opsi',opsi);

       return this.http.post(this.ServidorUrl+'consulta.php', opsi, header);
      }

      listarRuta_viaje_programada(){
        let info=new Array();
      let data={
        "key":"listarRuta_viaje_programada"
      };

      let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
      opsi   : any = JSON.stringify(data);
      console.log('opsi',opsi);

       return this.http.post(this.ServidorUrl+'consulta.php', opsi, header);
      }
      Get_Puntos(id_ruta){
        let info=new Array();
      let data={
        "key":"Get_Puntos",
        "id_ruta":id_ruta
      };

      let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
      opsi   : any = JSON.stringify(data);
      console.log('opsi',opsi);

       return this.http.post(this.ServidorUrl+'consulta.php', opsi, header);
      }
      insertarSolicitud(solicitud)
      {
        let data={
          "key":"insertarSolicitud",
          "id_de":solicitud.id_de,
    "id_para":solicitud.id_para,
    "id_viaje":solicitud.id_viaje,
    "mensaje":solicitud.mensaje,
    "estado":solicitud.estado,
    "fecha":solicitud.fecha,
    "latitud":solicitud.latitud,
    "longitud":solicitud.longitud,
    "sombrero":solicitud.sombrero,
    "superior":solicitud.superior,
    "inferior":solicitud.inferior,
    "accesorio":solicitud.accesorio,
    "posicion":0
        };

        let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
        opsi   : any = JSON.stringify(data);
        console.log('opsi',opsi);

         return this.http.post(this.ServidorUrl+'insertar.php', opsi, header);
      }
      listarMisSolicitudesAceptadas(ci){
        let info=new Array();
      let data={
        "key":"listarMisSolicitudesAceptadas",
        "ci":ci
      };

      let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
      opsi   : any = JSON.stringify(data);
      console.log('opsi',opsi);

       return this.http.post(this.ServidorUrl+'consulta.php', opsi, header);
      }
      eliminarSolicitud(id){
        let info=new Array();
      let data={
        "key":"eliminarSolicitud",
        "id":id
      };

      let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
      opsi   : any = JSON.stringify(data);
      console.log('opsi',opsi);

       return this.http.post(this.ServidorUrl+'eliminar.php', opsi, header);
      }
      actualizarCapacidad(capacidad,id_viaje){
        let info=new Array();
      let data={
        "key":"actualizarCapacidad",
        "capacidad":capacidad,
        "id_viaje":id_viaje
      };

      let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
      opsi   : any = JSON.stringify(data);
      console.log('opsi',opsi);

       return this.http.post(this.ServidorUrl+'actualizar.php', opsi, header);
      }
      obtenerCapacidadViaje(id_viaje)
      {
        let data={
          "key":"obtenerCapacidadViaje",
          "id_viaje":Number(id_viaje)
        };

        let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
        opsi   : any = JSON.stringify(data);
        console.log('opsi',opsi);

         return this.http.post(this.ServidorUrl+'consulta.php', opsi, header);
      }
        actualizarEstadoSolicitud(id_solicitud,estado){
          let info=new Array();
          let data={
            "key":"actualizarEstadoSolicitud",
            "id_solicitud":id_solicitud,
            "estado":estado
          };

          let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
          opsi   : any = JSON.stringify(data);
          console.log('opsi',opsi);

           return this.http.post(this.ServidorUrl+'consulta.php', opsi, header);
          }
      insertarcalificacion(calif)
      {
        let data={
          "key":"insertarcalificacion",
          "id_de": calif.id_de,
          "id_para":calif.id_para,
          "rol":calif.rol,
        "calificacion":calif.calificacion,
        "problemas":calif.problemas,
        "id_viaje":calif.id_viaje
        };

        let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
        opsi   : any = JSON.stringify(data);
        console.log('opsi',opsi);

         return this.http.post(this.ServidorUrl+'insertar.php', opsi, header);
      }

      validarFotoUsuario(usuarioFoto){
        let data={
          "key":"validarFotoUsuario",
          "usuarioFoto":usuarioFoto
        };

        let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
        opsi   : any = JSON.stringify(data);
        console.log('opsi',opsi);
         return this.http.post(this.ServidorUrl+'consulta.php', opsi, header);
      }
      validarFotoAuto(placa){
        let data={
          "key":"validarFotoAuto",
          "placa":placa
        };

        let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
        opsi   : any = JSON.stringify(data);
        console.log('opsi',opsi);
         return this.http.post(this.ServidorUrl+'consulta.php', opsi, header);
      }

      insertarrecogida(latitud,longitud,posicion){
        let data={
          "key":"insertarrecogida",
          "latitud": latitud,
          "longitud":longitud,
          "posicion":posicion
        };

        let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
        opsi   : any = JSON.stringify(data);
        console.log('opsi',opsi);

         return this.http.post(this.ServidorUrl+'insertar.php', opsi, header);
      }
      Updatepunto(id_punto,posicion){
        let data={
          "key":"Updatepunto",
          "id_punto": id_punto,
          "posicion":posicion
        };

        let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
        opsi   : any = JSON.stringify(data);
        console.log('opsi',opsi);
         return this.http.post(this.ServidorUrl+'actualizar.php', opsi, header);
      }
      obtenerHoraViaje(id_viaje){
        let info=new Array();
        let data={
          "key":"obtenerHoraViaje",
          "id_viaje":id_viaje
        };

        let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
        opsi   : any = JSON.stringify(data);
        console.log('opsi',opsi);

         return this.http.post(this.ServidorUrl+'consulta.php', opsi, header);
        }
        agregarrecogida(latitud,longitud,ci,id_viaje){
          let data={
            "key":"agregarrecogida",
            "latitud":latitud,
            "longitud":longitud,
            "ci":ci,
            "id_viaje":id_viaje
          };
  
          let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
          opsi   : any = JSON.stringify(data);
          console.log('opsi',opsi);
  
           return this.http.post(this.ServidorUrl+'insertar.php', opsi, header);
        }
        actualizarLocaclizacion(latitud,longitud,id_viaje){
          let data={
            "key":"loca",
            "latitud":latitud,
            "longitud":longitud,
            "id_viaje":Number(id_viaje)
          };
  
          let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
          opsi   : any = JSON.stringify(data);
          console.log('opsi',opsi);
  
           return this.http.post(this.ServidorUrl+'actualizar.php', opsi, header);
        }
        obtenerVestimenta(id_viaje,id_de){
          let data={
            "key":"obtenerVestimenta",
            "id_de":id_de,
            "id_viaje":id_viaje
          };
  
          let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
          opsi   : any = JSON.stringify(data);
          console.log('opsi',opsi);
  
           return this.http.post(this.ServidorUrl+'consulta.php', opsi, header);
        }
        obtener_Puntos(id_viaje){
          let data={
            "key":"obtener_Puntos",
            "id_viaje":id_viaje
          };
  
          let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
          opsi   : any = JSON.stringify(data);
          console.log('opsi',opsi);
  
           return this.http.post(this.ServidorUrl+'consulta.php', opsi, header);
        }
        obtener_Puntos_Recogida(id_viaje){
          let data={
            "key":"obtener_Puntos_Recogida",
            "id_viaje":id_viaje
          };
  
          let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
          opsi   : any = JSON.stringify(data);
          console.log('opsi',opsi);
  
           return this.http.post(this.ServidorUrl+'consulta.php', opsi, header);
        }
        registrarReporte(reporte){
          let data={
            "key":"registrarReporte",
            "problema":reporte.problema,
              "ci":reporte.ci,
              "fecha":reporte.fecha,
              "calle":reporte.calle,
              "id_viaje":reporte.id_viaje
          };
  
          let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
          opsi   : any = JSON.stringify(data);
          console.log('opsi',opsi);
  
           return this.http.post(this.ServidorUrl+'insertar.php', opsi, header);
        }
        terminarRuta(id_viaje){
          let info=new Array();
          let data={
            "key":"terminarRuta",
            "id_viaje":id_viaje,
            "estado":"Terminado"
          };
      
          let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
          opsi   : any = JSON.stringify(data);
          console.log('opsi',opsi);
      
           return this.http.post(this.ServidorUrl+'actualizar.php', opsi, header);
          }
          fechaviaje_solicitud(id_viaje){
            let info=new Array();
            let data={
              "key":"fechaviaje_solicitud",
              "id_viaje":id_viaje
            };
        
            let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
            opsi   : any = JSON.stringify(data);
            console.log('opsi',opsi);
        
             return this.http.post(this.ServidorUrl+'consulta.php', opsi, header);
            }
            Get_Ubicacion(id_viaje){
              let data={
                "key":"Get_Ubicacion",
                "id_viaje":id_viaje
              };
          
              let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
              opsi   : any = JSON.stringify(data);
              console.log('opsi',opsi);
          
               return this.http.post(this.ServidorUrl+'consulta.php', opsi, header);
              }
}
