import { rutaprogramada } from './../interfaces/ruta.programada.interface';
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from 'angularfire2/database';
import { Usuario } from '../interfaces/usuario.interface';
import { Reserva } from "../interfaces/reserva.interface";
import { Ruta } from "../interfaces/rutas.interface";
import { rutaactiva } from "../interfaces/rutactiva.service";
import { startTimeRange } from '@angular/core/src/profile/wtf_impl';
import { Vehiculo } from '../interfaces/vehiculo.interface';

@Injectable()

export class firebaseService{
    ruta:Ruta={
        puntos:'',
        nombre:'',
        correousuario:''
      };
    public k= '';
    [x: string]: any;
    private userRef;
    private reservaRef;
    //    private shopingRef = this.db.list<Item>('shopping-list/nuevos');


    constructor(private db:AngularFireDatabase){

    }

    definirUsusarioRef(aux:any)
    {
        this.userRef=this.db.list<Usuario>('Usuario/'+aux+'/info');
    }

    definirReservaRef(aux:any)
    {
        this.reservaRef=this.db.list<Reserva>('Reserva/'+aux);
    }

    getUsuariarios()
    {
        return this.userRef;
    }
    getReserva()
    {
        return this.reservaRef;
    }

    add(usuario:Usuario)
    {
        let stringToSplit = usuario.correo;//split el correo porel punto
        let x = stringToSplit.split(".");
       return this.db.database.ref('Usuario/'+x[0]+'/info').set(usuario);
    }
    editPerfil(usuario:any,aux:string)
    {
        //return this.userRef.update(this.k, usuario);
        return this.db.database.ref('Usuario/'+aux+'/info').update(usuario);
       // return this.db.list('Usuario/').update(aux[0],usuario);
    }
    editC(usuario:any,aux)
    {
        console.log(usuario.tipo);
        console.log(aux[0]);
        //return this.userRef.update(this.k, usuario);
        return this.db.database.ref('Usuario/'+aux[0]+'/info').update(usuario);
    }
    editP(usuario:any,aux)
    {
        console.log(usuario.tipo);
        console.log(aux[0]);
        //return this.userRef.update(this.k, usuario);
        return this.db.database.ref('Usuario/'+aux[0]+'/info').update(usuario);
    }
    tipoBlank(usuario:any,aux)
    {
        console.log(usuario.tipo);
        console.log(aux[0]);
        //return this.userRef.update(this.k, usuario);
        return this.db.database.ref('Usuario/'+aux[0]).update(usuario);
    }
    getUsers()
    {
        //return this.db.list('Usuario/');
        return this.db.list('Usuario/').valueChanges();//CAMBIO
    }


//Definir direccion para giardar ruta
definirRutaRef(aux:any,nom:any){
    this.rutaRef=this.db.list<Ruta>('Usuario/'+aux+'/Ruta/'+nom);
}
//Guardar la ruta
addRuta(ruta:Ruta){
    let aux=ruta.correousuario;
    let x=aux.split('.');
    return this.db.database.ref('Usuario/'+x[0]+'/Ruta/'+ruta.nombre).set(ruta);
}
//obtener ruta
getRuta(correo:any){
    let x=correo.split('.');
return this.db.list('Usuario/'+x[0]+'/Ruta/').valueChanges();
}
//guardar ruta activa
RutaActiva(ruta:any){
    let aux=ruta.email;
    let x=aux.split('.');
    this.rutaRef=this.db.list<rutaactiva>('RutaActiva/'+x[0]);
    return this.db.database.ref('RutaActiva/'+x[0]).update(ruta);
}
//obtener rutas programadas
getRutasPro(){
    //let x=correo.split('.');
    return this.db.list('RutasProgramadas');
}
//guardar rutas programadas
setRutaPro(ruta:rutaprogramada){
    let aux=ruta.correo;
    let x=aux.split('.');
    let auxfe='';
    auxfe=ruta.fecha;
    let x1=auxfe.split('-');
    let string=x[0]+x1[0]+x1[1]+x1[2];
    auxfe=ruta.hora;
    x1=auxfe.split(':');
    string=string+x1[0]+x1[1]+'/';
    this.rutaRef=this.db.list<rutaprogramada>('RutasProgramadas/'+string);
    return this.db.database.ref('RutasProgramadas/'+string).set(ruta);
}
//saca rutas activas
getActivas(){
    return this.db.list('RutaActiva/').valueChanges();
}

    //autos
    private autoRef;

    definirAutoRef(aux:any,correo:string)
    {
        this.autoRef=this.db.database.ref('Usuario/'+correo+'/Autos/'+aux);
    }

    addAuto(vehiculo:Vehiculo)
    {
        return this.autoRef.set(vehiculo);
    }

    getAutosRef(correo:string)
    {
        return this.db.list('Usuario/'+correo+'/Autos');
    }

    editarAutos(auto:Vehiculo,placa:string,correo:string)
    {
        return this.getAutosRef(correo).update(placa,auto);
    }
    eliminarAutos(placa:string,correo:string)
    {
        return this.getAutosRef(correo).remove(placa);
    }
    getUser(user){
        return this.db.list<Usuario>('/Usuario/'+user+'/info');
    }


    //verProgramadas

    private programadasRef;

    definirProgramadasRef(aux:any,correo:string)
    {
        this.autoRef=this.db.database.ref('Usuario/'+correo+'/Autos/'+aux);
    }

    getProgramadasRefTotal()
    {
        return this.db.list('/RutasProgramadas');
    }

    getNombresRef()
    {
        return this.db.list('Usuario/');
    }



    //solicitud

    private solicitudRef;
    private miSolicitudRef;

    definirSolicitarRef(tucorreo,micorreo,fecha,hora)
    {
        this.solicitudRef=this.db.database.ref('Usuario/'+tucorreo+'/Solicitud/'+micorreo+fecha+hora);
    }

    addSolicitud(solicitud)
    {
        return this.solicitudRef.set(solicitud);
    }

    getSolicitudRef()
    {
        return this.db.list('Usuario/');
    }
    //mi solicitud
    definirMiSolicitudRef(tucorreo,micorreo,fecha,hora)
    {
        this.miSolicitudRef=this.db.database.ref('Usuario/'+micorreo+'/MisSolicitudes/'+tucorreo+fecha+hora);
    }

    addMiSolicitud(solicitud)
    {
        return this.miSolicitudRef.set(solicitud);
    }

    //buzones

    getMisSolicitudesRef(correo:string)
    {
        return this.db.list('Usuario/'+correo+'/MisSolicitudes');
    }
    getSolicitudesRef(correo:string)
    {
        return this.db.list('Usuario/'+correo+'/Solicitud');
    }
    obtenerNombreParaSolicitud(correo:string)
    {
        return this.db.list('Usuario/'+correo+'/info');
    }

    getSRef(correo:string)
    {
        return this.db.list('Usuario/'+correo+'/Solicitud');
    }
    editarSolicitud(correo:string,rama,data)
    {
        return this.getSRef(correo).update(rama,{estado:data});
    }
    getMRef(correo:string)
    {
        return this.db.list('Usuario/'+correo+'/MisSolicitudes');
    }
    editarMiSolicitud(correo:string,rama,data)
    {
        return this.getMRef(correo).update(rama,{estado:data});
    }
    getCapacidadRef()
    {
        return this.db.list('RutasProgramadas');
    }
    editarCapacidad(rama,data)
    {
        return this.getCapacidadRef().update(rama,{capacidad:data});
    }



    //obtener la cantidad de solicitudes que tengo en un toast
    getCantidadSolicitudesRef(correo:string)
    {
        return this.db.list('Usuario/'+correo+'/Solicitud');
    }

    //funcion para error de nombre
    getUsuario(correo)
    {
        let rama=correo.split('.');
        return this.db.list('Usuario/'+rama[0]+'/info');
    }
    getRutaRef(correo)
    {
        let x=correo.split('.');
        return this.db.list('Usuario/'+x[0]+'/Ruta/');
    }
    eliminarRuta(nombre , correo)
    {
        return this.getRutaRef(correo).remove(nombre);
    }
    getActivasRef()
    {
        return this.db.list('RutaActiva/');
    }
    updatePro(data){
        let aux=data.correo.split('.');
        let cadena=''+aux[0];
        aux=data.fecha.split('-');
        cadena=cadena+aux[0]+aux[1]+aux[2];
        aux=data.hora.split(':');
        cadena=cadena+aux[0]+aux[1];
        return this.db.database.ref('RutasProgramadas/'+cadena+'/').update(data);
    }
    getRutaActivaref()
    {
        return this.db.list('RutaActiva/');
    }
    eliminarRutaActiva(correo:string)
    {
        return this.getRutaActivaref().remove(correo);
    }
    latlong(cadena){
        return this.db.list('RutaActiva/'+cadena+'/');
    }
    getActivas1(){
        return this.db.list('/RutaActiva');
    }
    updateAct(data){
        let aux=data.email.split('.');
        return this.db.database.ref('RutaActiva/'+aux[0]+'/').update(data);
    }
    //borrar reserva
    private misolicitudEliminadaRef;
    getmisolicitudEliminadaRef(correo:string)
    {
        return this.db.list('Usuario/'+correo+'/MisSolicitudes');
    }
    eliminarMiSolicitud(rama:string,correo:string)
    {
        return this.getmisolicitudEliminadaRef(correo).remove(rama);
    }
    getsolicitudEliminadaRef(correo:string)
    {
        return this.db.list('Usuario/'+correo+'/Solicitud');
    }
    eliminarSolicitud(rama:string,correo:string)
    {
        return this.getsolicitudEliminadaRef(correo).remove(rama);
    }
    dameCapacidadRuta(ruta:string)
    {
        return this.db.list('RutasProgramadas/'+ruta);
    }
    editarCapacidadAlCancelar(rama,data)
    {
        return this.getCapacidadRef().update(rama,{capacidad:data.capacidad});
    }

    //funciones para la eliminacion de las rutas agendadas

    cad;
    getRutaAgendadaRef()
    {
        return this.db.list('RutasProgramadas/');
    }
    eliminarRutaAgendada(nombre , correo , fecha , hora)
    {
        let co=correo.split('.');
        let fe=fecha.split('-');
        let ho=hora.split(':');
        this.cad = co[0]+fe[0]+fe[1]+fe[2]+ho[0]+ho[1];
        console.log(this.cad);
        return this.getRutaAgendadaRef().remove(this.cad);
    }
    calificar(aux2,mensaje){
        return this.db.database.ref('Usuario/'+aux2+'/MisSolicitudes/'+mensaje.de+'/').set(mensaje);
    }

    //contadores de inicio de sesion
    obtenerInicioSesion(correo:string)
    {
      return this.db.list('/Usuario/'+correo+'/info');
    }
    editarInicioSesionConductor(correo:string,data)
    {
      return this.db.database.ref('/Usuario/'+correo+'/info').update({inicioSesionConductor:data});
    }
    editarInicioSesionPasajero(correo:string,data)
    {
      return this.db.database.ref('/Usuario/'+correo+'/info').update({inicioSesionPasajero:data});
    }

    //fechaIngreso
    agregarFechaIngreso(correo:string)
    {
      let hoy = new Date();
      let dd = hoy.getDate();
      let mm = hoy.getMonth()+1;
      let yyyy = hoy.getFullYear();
      let date=yyyy+'-'+mm+'-'+dd;
      this.autoRef=this.db.database.ref('Usuario/'+correo+'/FechaIngreso/').push({fecha:date});
    }

    //editar capacidad al aceptar
    getRutaProgramada(rama:string){
      //let x=correo.split('.');
      return this.db.list('RutasProgramadas/'+rama);
  }
  editarCapaci(correo:string,data)
    {
      return this.db.database.ref('/RutasProgramadas/'+correo).update(data);
    }
    //activar Ruta
    quitarRuta(rama)
    {
      return this.db.list('RutasProgramadas').remove(rama);
    }
    obtenerRuta(rama)
    {
      return this.db.list('RutasProgramadas/'+rama);
    }
    agregarRutaActiva(rama,ruta)
    {
      this.db.database.ref('RutaActiva/'+rama).update(ruta);
    }

//prueba
    pruebaRef()
    {
        return this.db.list('chatroma/roma@ucbzfecha/');
    }
    editar(data)
    {
        return this.db.database.ref('/prueba/numeros').update({number1:Number(data)});
    }
//calificacion
calificarcond(correo,obj){
    if(correo!=''){
    let y=obj.de.split('.');
    let aux=y[0]+'calif'+obj.fecha;
    this.db.database.ref('Usuario/'+correo+'/MisSolicitudes/'+aux+'/').set(obj);}
  }
  calificarpasa(correo,obj){
    if(correo!=''){
    let aux=correo+'calif'+obj.fecha;
    this.db.database.ref('Usuario/'+correo+'/Solicitud/'+aux+'/').set(obj);}
  }
  upca(correol,obj){
    if(correol!=''){
    let correo=correol.split('.');
    let y=obj.de.split('.');
    let aux=y[0]+'calif'+obj.fecha;
    this.db.database.ref('Usuario/'+correo[0]+'/MisSolicitudes/'+aux+'/').update(obj);}
  }
  calif(mio,tuyo,puntos,fecha){
    if(mio!='' && tuyo !=''){
      let vari={
          puntos:puntos
      };
    this.db.database.ref('Calificacion/'+tuyo+'/conductor/'+fecha+'/'+mio+'/').update(vari);
    this.updacond(tuyo,puntos);
    }
  }
  calif2(mio,tuyo,puntos,fecha){
    if(mio!='' && tuyo !=''){
    let vari={
        puntos:puntos
    };
  this.db.database.ref('Calificacion/'+tuyo+'/pasajero/'+fecha+'/'+mio+'/').update(vari);
  this.updapasa(tuyo,puntos);}
}


  upca1(correo,obj){
      
    if(correo!=''){
      console.log(obj);
      
    let correo1=correo.split('.');
    let aux=correo1[0]+'calif'+obj.fecha;
    this.db.database.ref('Usuario/'+correo1[0]+'/Solicitud/'+aux+'/').update(obj);}
  }

  updacond(correo,cantidad){
      
    if(correo!=''){
    let vari={
        califconduc:cantidad
    };
    this.db.database.ref('Usuario/'+correo+'/info/').update(vari);}
  }
  updapasa(correo,cantidad){
      
    if(correo!=''){
    let vari={
        califpasa:cantidad
    };
    this.db.database.ref('Usuario/'+correo+'/info/').update(vari);}
  }
  //solicitud activa
  activarme(correo,obj){
    let correo1=correo.split('.'); 
    let aux=obj.a.split('.');
    this.db.database.ref('Usuario/'+correo1+'/MisSolicitudes/'+aux[0]+'/').update(obj);
  }
  activarlo(correo,obj){
    let correo1=correo.split('.');
    this.db.database.ref('SolicitudActiva/'+correo1).update(obj);
  }

    quitarSolicitudesIntegrantes(correo:string,rama:string)
    {
      return this.db.list('Usuario/'+correo+'/MisSolicitudes').remove(rama);
    }

    enviarSolicitudesActiva(conductor:string,integrante:string,fecha:string,hora:string)
    {
        let obj={
            de:conductor,
            estado:'Activa',
            fecha:fecha+'|'+hora,
            mensaje:'La ruta ya fue activada'
        };
      //  if(integrante!='')
            this.db.database.ref('Usuario/'+integrante+'/MisSolicitudes/'+conductor).set(obj);

    }
    getlatlon(de,fechahora){
        return this.db.list('Usuario/'+de+'/Solicitud/'+fechahora);
    }
    eliminarSolicitudesActiva(conductor:string,integrante:string)
    {
        return this.db.list('Usuario/'+integrante+'/MisSolicitudes/').remove(conductor);

    }
    getRutaActiva(correo:string){
        return this.db.list('/RutaActiva/'+correo);
    }
  
    obtenerInfo(correo:string){
      return this.db.list('/Usuario/'+correo+'/info');
  }
  actpasa(pasajero,total){
      let obj={
        viajesRealizadosPasajero:total
      };
    this.db.database.ref('Usuario/'+pasajero+'/info/').update(obj);

  }
  actcond(cond,total){
    let obj={
        viajesRealizadosConductor:total
    };
  this.db.database.ref('Usuario/'+cond+'/info/').update(obj);

}
reporte(obj){
    let aux=obj.persona.split('.');
    this.db.database.ref('Reporte/'+obj.fecha+'/'+obj.calle+'/'+aux[0]).update(obj);
}
}
