
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { AuthJWT } from '../models/AuthJWT';
import { Router } from '@angular/router';
import { Login } from '../models/Login';
import { NuevaActividad } from '../models/nuevaactividad';
import { environment } from '../../environments/environment';


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
    return this.usrHttp.post(environment.apiUrlNewUse, usua, httpOptionsJWT);
  }

  logInJWT (dataUsua: Login):Observable<any> 
  {
    console.log(dataUsua) 
    return this.usrHttp.post(environment.apiUrlLog, dataUsua, httpOptionsJWT).pipe
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
          if (this.tResu.resultado.diagnostico_medico != undefined){
            sessionStorage.setItem('dDiagnosticoMed', this.tResu.resultado.diagnostico_medico)
          }
          if (this.tResu.resultado.diagnostico_lenguaje != undefined){
            sessionStorage.setItem('dDiagnosticoLen', this.tResu.resultado.diagnostico_lenguaje)
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
    return this.usrHttp.get(environment.apiUrlGetAct, httpOptionsJWT);
  }
  get_habilidades(){
    return this.usrHttp.get(environment.apiUrlGetHab, httpOptionsJWT);
  }
  get_one_resource(id: string){
    //return this.usrHttp.get("http://127.0.0.1:8000/recurso/"+id, httpOptionsJWT);
    return this.usrHttp.get(environment.apiUrlOneRes+id, httpOptionsJWT);
  }
  get_area(){
    return this.usrHttp.get(environment.apiUrlGetAre, httpOptionsJWT);
  }
  get_bloque(){
    return this.usrHttp.get(environment.apiUrlGetBlo, httpOptionsJWT);
  }
  get_competencia(){
    return this.usrHttp.get(environment.apiUrlGetCom, httpOptionsJWT);
  }
  get_icd10(){
    return this.usrHttp.get(environment.apiUrlGetIcd, httpOptionsJWT)
  }
  get_indicadores(){
    return this.usrHttp.get("http://127.0.0.1:8000/indicadores", httpOptionsJWT);
    //return this.usrHttp.get(environment.apiUrlGetInd, httpOptionsJWT);
  }
  new_acti_habi(acti_habi: any):Observable<any>{
    //return this.usrHttp.post("http://127.0.0.1:8000/habilidades", acti_habi, httpOptionsJWT);
    return this.usrHttp.post(environment.apiUrlNewAct, acti_habi, httpOptionsJWT);
  }
  get_one_acti(id: string){
    return this.usrHttp.get(environment.apiUrlGetOneAct+id, httpOptionsJWT);
  }
  get_one_habi(id: string){
    //return this.usrHttp.get("http://127.0.0.1:8000/habilidad/"+id, httpOptionsJWT);
    return this.usrHttp.get(environment.apiUrlGetOneHab+id, httpOptionsJWT);
  }
  obtener_recurso(ids: any) {
    return this.usrHttp.post("http://127.0.0.1:8000/obtenerrecursos", ids, httpOptionsJWT);
    //return this.usrHttp.post(environment.apiUrlGetRes, ids, httpOptionsJWT);
  }
  get_icd10lan(){
    return this.usrHttp.get(environment.apiUrlGetIcdLan, httpOptionsJWT)
  }
  set_act_dis(ids: string):Observable<any> {
    ids = encodeURIComponent("ICD10CM:Q90")
    return this.usrHttp.post("http://127.0.0.1:8000/actividades_d?id_e="+ids,  httpOptionsJWT)
    //return this.usrHttp.post(environment.apiUrlSetActEsp, ids,  httpOptionsJWT);
  }  
  get_one_act_dis(id: string){
    //return this.usrHttp.get("http://127.0.0.1:8000/actividad_d/"+id, httpOptionsJWT)
    return this.usrHttp.get(environment.apiUrlGetOneActEsp+id, httpOptionsJWT)
  }
  get_act_dis(){
    //return this.usrHttp.get("http://127.0.0.1:8000/actividades_d", httpOptionsJWT)
    return this.usrHttp.get(environment.apiUrlGetActEsp, httpOptionsJWT)
  }
  get_act_rece(){
    return this.usrHttp.get('http://127.0.0.1:8000/actividades_reci', httpOptionsJWT)
  }

  get_act_dis_rece(){
    return this.usrHttp.get('http://127.0.0.1:8000/actividades_disc_reci', httpOptionsJWT)
  }
}
