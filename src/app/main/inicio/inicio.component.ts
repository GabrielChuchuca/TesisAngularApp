import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  sToken: string = sessionStorage.getItem('token') || "";
  sUsua: string = sessionStorage.getItem('username') || '';
  fechNaci:any;
  rol: string = sessionStorage.getItem('dRol');
  diagnosticoMed: any;
  fA: Date = new Date();
  fN!: Date;
  resu: any = [];
  habi: any = [];
  recu: any = []
  indi: any = []
  tiem!: number;
  page_acti: number = 1;
  page_habi: number = 1;
  capa_espe: boolean = sessionStorage.getItem('dCapacidadEsp') == 'true' ? true : false;
  actividad: any;
  habilidad: any;
  acti_disc: any;

  constructor(private ser:ServiciosService, private pRuta: Router) { 
    
  }

  ngOnInit(): void {
    //this.sToken = sessionStorage.getItem('token') || "";
    //this.sUsua = sessionStorage.getItem('username') || '';
    //this.capa_espe = sessionStorage.getItem('dCapacidadEsp') == 'true' ? true : false;
    if (this.sToken.length === 0) { this.pRuta.navigateByUrl('/login'); }
    else{
      if(this.capa_espe == true){
        this.diagnosticoMed = sessionStorage.getItem('dDiagnosticoMed').split(",");
        console.log(this.diagnosticoMed)
        this.ser.get_act_dis(this.diagnosticoMed).subscribe(acdi => {
          this.acti_disc = acdi
          console.log(this.acti_disc)
        })
      }else{
        this.ser.get_actividades_libro().subscribe(res => {
          console.time("actividades");
          this.resu = res;
          //this.totalActividades = this.resu.length;
          console.timeEnd('actividades');
        }) 
        this.ser.get_habilidades().subscribe(h => {
          console.time("habilidades");
          this.habi = h;
          //console.log(this.habi)
          //this.totalHabilidades = this.habi.length;
          console.timeEnd('habilidades');
        })
        /*this.ser.get_indicadores().subscribe(i => {
          this.indi = i;
          //console.log(this.indi)
        })*/
      }
      
    }


    this.fechNaci = sessionStorage.getItem('dFechaNac') || '';
    this.fN = new Date(this.fechNaci.split('T')[0].split('-')[0], this.fechNaci.split('T')[0].split('-')[1]-1, this.fechNaci.split('T')[0].split('-')[2])
    this.tiem = this.fA.getFullYear() - this.fN.getFullYear()
    if(this.fA.getMonth() < this.fN.getMonth()){
      if(this.fA.getDay() < this.fN.getDay()){
        this.tiem = this.tiem - 1
      }
    }
  }
  SearchA(){
    //console.log(this.actividad.length)
    if(this.actividad == ""){
      this.ngOnInit()
    }else if(this.actividad.length > 0){
      //console.log("elseif")
      this.resu = this.resu.filter(res => {
        return res.actividades?.toLocaleLowerCase().match(this.actividad.toLocaleLowerCase());
      })
    }
  }
  SearchH(){
    if(this.habilidad == ""){
      this.ngOnInit()
    }else{
      this.habi = this.habi.filter(hab => {
        return hab.Habilidad?.toLocaleLowerCase().match(this.habilidad.toLocaleLowerCase());
      })
    }
  }
} 
