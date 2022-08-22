
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { AuthJWT } from '../models/AuthJWT';
import { Router } from '@angular/router';
import { Login } from '../models/Login';
import { NuevaActividad } from '../models/nuevaactividad';


const httpOptionsJWT = { headers: new HttpHeaders ({'Content-type': 'application/json'}) }

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  secAuth: AuthJWT = new AuthJWT();
  tResu: any;

  constructor(private usrHttp: HttpClient, private pRuta: Router) { }

  securityReset() { this.secAuth.jwt = ''; }

  nuevoUsuario(usua:Usuario):Observable<any> {
    return this.usrHttp.post("http://127.0.0.1:8000/users", usua, httpOptionsJWT);
  }

  logInJWT (dataUsua: Login)
  {
    console.log(dataUsua) 
    return this.usrHttp.post('http://127.0.0.1:8000/login', dataUsua, httpOptionsJWT).pipe
      (
        tap((vResp) =>
        {
          console.log(vResp);
          Object.assign(this.secAuth, vResp); this.tResu = vResp;
          sessionStorage.setItem('token', this.secAuth.jwt); sessionStorage.setItem('username', dataUsua.username);
          sessionStorage.setItem('dId', this.tResu.resultado._id);
          sessionStorage.setItem('dCedula', this.tResu.resultado.cedula);
          sessionStorage.setItem('dApelNomb', this.tResu.resultado.apellido + " " + this.tResu.resultado.nombre);
          sessionStorage.setItem('dCedula', this.tResu.resultado.cedula);
          sessionStorage.setItem('dFechaNac', this.tResu.resultado.fechaNacimiento);
          if (this.tResu.resultado.unidadEducativa != undefined) {
            sessionStorage.setItem('dUnidadEdu', this.tResu.resultado.unidadEducativa);
          }
          if (this.tResu.resultado.capacidad_especial != undefined) {
            sessionStorage.setItem('dCapacidadEsp', this.tResu.resultado.capacidad_especial);
          }
          sessionStorage.setItem('dRol', this.tResu.resultado.rol);
        }),
        catchError(this.handleError)
      )
  }

  logOut()
  {
    this.securityReset();
    sessionStorage.clear();
    this.pRuta.navigateByUrl('/login');
  }
  handleError (pErra : any)
  {
    window.alert('Usuario y/o Clave no existe...');
    sessionStorage.clear();
    return throwError (pErra.error);
  }

  get_actividades_libro(){
    return this.usrHttp.get("http://127.0.0.1:8000/actividades", httpOptionsJWT);
  }
  get_habilidades(){
    return this.usrHttp.get("http://127.0.0.1:8000/habilidades", httpOptionsJWT);
  }
  get_one_resource(id: string){
    return this.usrHttp.get("http://127.0.0.1:8000/recurso/"+id, httpOptionsJWT);
  }
  get_area(){
    return this.usrHttp.get("http://127.0.0.1:8000/areas", httpOptionsJWT);
  }
  get_bloque(){
    return this.usrHttp.get("http://127.0.0.1:8000/bloques", httpOptionsJWT);
  }
  get_competencia(){
    return this.usrHttp.get("http://127.0.0.1:8000/competencias", httpOptionsJWT);
  }
  get_icd10(){
    return this.usrHttp.get("http://127.0.0.1:8000/icd10", httpOptionsJWT)
  }
  get_indicadores(){
    return this.usrHttp.get("http://127.0.0.1:8000/indicadores", httpOptionsJWT);
  }
  new_acti_habi(acti_habi:NuevaActividad):Observable<any>{
    return this.usrHttp.post("http://127.0.0.1:8000/habilidades", acti_habi, httpOptionsJWT);
  }
  get_one_acti(id: string){
    return this.usrHttp.get("http://127.0.0.1:8000/actividad/"+id, httpOptionsJWT);
  }
  get_one_habi(id: string){
    return this.usrHttp.get("http://127.0.0.1:8000/habilidad/"+id, httpOptionsJWT);
  }
}
