import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NuevaActividad } from 'src/app/models/nuevaactividad';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-nuevaactividad',
  templateUrl: './nuevaactividad.component.html',
  styleUrls: ['./nuevaactividad.component.css']
})
export class NuevaactividadComponent implements OnInit {
  nNew_acti: NuevaActividad = new NuevaActividad();
  sToken: string = "";
  sUsua!: string;
  rol: string = sessionStorage.getItem('dRol');
  fechNaci:any;
  fA: Date = new Date();
  fN!: Date;
  tiem!: number;
  options: string[] = ["Actividad", "Habilidad"];
  option: string = "";
  lArea: any;
  lBloq: any;
  lBloq1: any[] = [];
  lComp: any;
  lComp1: any[] = [];
  lIdRecu: any[] = [];
  lines:any[] = []; //for headings
  linesR:any[] = []; // for rows
  page_csv: number = 1;
  conf: boolean = false;
  constructor(private ser:ServiciosService, private pRuta:Router) { }

  ngOnInit(): void {
    this.nNew_acti.Habilidad = "";
    
    this.sToken = sessionStorage.getItem('token') || "";
    this.sUsua = sessionStorage.getItem('username') || '';
    if (this.sToken.length === 0) { this.pRuta.navigateByUrl('/login'); }
    if (this.rol === 'usuario') { this.pRuta.navigateByUrl('/inicio'); }
    this.ser.get_area().subscribe(are => {
      this.lArea = are;
      //console.log(this.lArea)
    })

    this.fechNaci = sessionStorage.getItem('dFechaNac') || '';
    this.fN = new Date(this.fechNaci.split('T')[0].split('-')[0], this.fechNaci.split('T')[0].split('-')[1]-1, this.fechNaci.split('T')[0].split('-')[2])
    this.tiem = this.fA.getFullYear() - this.fN.getFullYear()
    if(this.fA.getMonth() < this.fN.getMonth()){
      if(this.fA.getDay() < this.fN.getDay()){
        this.tiem = this.tiem - 1
      }
    }
  }
  onAreaChange(event){
    console.log(event.value)
    this.nNew_acti.Area = event.value
    this.nNew_acti.Bloque = "";
    console.log(this.nNew_acti)
    /*this.ser.get_one_area(event.value).subscribe(one_are => {
      console.log(one_are)
    })*/
    this.ser.get_bloque().subscribe(bloq => {
      this.lBloq = bloq
      //console.log(this.lBloq)
      this.lBloq1 = []
      this.lComp1 = []
      //console.log(this.lBloq)
      for (let index = 0; index < this.lBloq.length; index++) {
        if(event.value === this.lBloq[index].Area)
          ///console.log(this.lBloq[index])
          this.lBloq1.push(this.lBloq[index]);
      }
    })
  }
  onBloqChange(event){
    console.log(event.value)
    this.nNew_acti.Bloque = event.value
    this.nNew_acti.Competencia = "";
    console.log(this.nNew_acti)
    this.ser.get_competencia().subscribe(comp =>{
      this.lComp = comp;
      //console.log(this.lComp)
      this.lComp1 = []
      for (let index = 0; index < this.lComp.length; index++) {
        if(event.value === this.lComp[index].Bloque)
          this.lComp1.push(this.lComp[index]);
      }
      //console.log(this.lComp1)
    })
  }
  onCompChange(event){
    console.log(event.value)
    this.nNew_acti.Competencia = event.value
    console.log(this.nNew_acti)
  }
  options_new(value:any){
    console.log(value)
    if (value === 'Actividad') {
      this.lBloq1 = []
      this.lComp1 = [] 
      delete this.nNew_acti.Area
      delete this.nNew_acti.Bloque
      delete this.nNew_acti.Competencia
    }else if(value === 'Habilidad'){
      delete this.nNew_acti.indicadores
      this.nNew_acti.Area = ""
      console.log(this.nNew_acti)
      ///this.nNew_acti.Area = ""
      ///console.log(this.nNew_acti.indicadores)
    }
    
  }
  get_new_ac(value: any){
    //console.log(value)
    if (value === '') {
      this.option = ''
      this.lBloq1 = []
      this.lComp1 = [] 
    }else{
      this.nNew_acti.indicadores = "";
      this.nNew_acti.Habilidad = value
      console.log(this.nNew_acti)
    }
  }
  get_new_in(value: any){
    console.log(this.nNew_acti)
    if (value !== '') {
      this.nNew_acti.indicadores = value;
    }
  }
  reg_new_ah(){
    console.log(this.nNew_acti)
    //this.a = {'Habilidad': 'dss', 'Area': 'sdsdssss'}
    
    this.ser.new_acti_habi(this.nNew_acti).subscribe(re_ac_ha => {
      console.log(re_ac_ha)
      if(re_ac_ha.message == 'Nueva Habilidad Guardada'){
        alert(re_ac_ha.message)
        console.log(this.nNew_acti)
        this.lIdRecu.push(re_ac_ha.id)
        this.nNew_acti.Habilidad = ""
        if(this.nNew_acti.indicadores != undefined){
          delete this.nNew_acti.indicadores
        }else if(this.nNew_acti.Area != undefined && this.nNew_acti.Bloque != undefined && this.nNew_acti.Competencia != undefined){
          delete this.nNew_acti.Area
          delete this.nNew_acti.Bloque
          delete this.nNew_acti.Competencia
        }

      }
      console.log(this.nNew_acti)
      this.option = ""
      console.log(this.lIdRecu)
        //window.location.reload()
      })
  }
  reg_news_ah(){
    //console.log(this.linesR[0])
    if (this.linesR[0].length > 0) {
      console.log(this.linesR[0].length)
      for (let index = 0; index < this.linesR[0].length; index++) {
        //console.log(this.linesR[0][index]);
        this.nNew_acti.Habilidad = this.linesR[0][index][3]
        this.nNew_acti.Area = this.linesR[0][index][0]
        this.nNew_acti.Bloque = this.linesR[0][index][1]
        this.nNew_acti.Competencia = this.linesR[0][index][2]
        //console.log(this.nNew_acti)
        this.ser.new_acti_habi(this.nNew_acti).subscribe(re_ac_ha =>{
          //if(re_ac_ha.message == 'Nueva Habilidad Guardada'){
            console.log(re_ac_ha)
            this.lIdRecu.push(re_ac_ha.id)
            console.log(this.lIdRecu)
            /*this.nNew_acti.Habilidad = ""
            if(this.nNew_acti.indicadores != undefined){
              delete this.nNew_acti.indicadores
            }else if(this.nNew_acti.Area != undefined && this.nNew_acti.Bloque != undefined && this.nNew_acti.Competencia != undefined){
              delete this.nNew_acti.Area
              delete this.nNew_acti.Bloque
              delete this.nNew_acti.Competencia
            }*/
    
          //}
        })
        
      }
      
      alert('Nuevas Habilidades Guardadas')
    }
    
    
  }
  selectFile(files: Event,): void {
    
    console.log((files.target as HTMLInputElement) .files)
    let file : File = (files.target as HTMLInputElement) .files.item(0);
    console.log(file.name)
    console.log(file.size)
    console.log(file.type)
    let reader: FileReader = new FileReader();
    reader.readAsText(file, 'ISO-8859-1');
    reader.onload = (e) => {
      let csv: any = reader.result;
      console.log(csv)
      let allTextLines = [];
      allTextLines = csv.split(/\r|\n|\r/);
      console.log(allTextLines)
      let headers = allTextLines[0].split(';');
      let data = headers;
      console.log(data)
      let tarr = [];
      for (let j = 0; j < headers.length; j++) {
        tarr.push(data[j]);
      }
      //Pusd headings to array variable
      this.lines.push(tarr);
      // Table Rows
      let tarrR = [];
      let arrl = allTextLines.length;
      let rows = [];
      for(let i = 1; i < arrl; i++){
        rows.push(allTextLines[i].split(';'));
      
      }
      
      for (let j = 0; j < arrl; j++) {
        tarrR.push(rows[j]);
      }
      //Push rows to array variable
      this.linesR.push(tarrR);
      this.lines = this.lines.filter(val => val != '')
      this.linesR[0] = this.linesR[0].filter(val => val != '' && val != undefined)
      console.log(this.lines[0].length)
      console.log(this.linesR[0].length)
      if(this.lines[0].length > 0 && this.linesR[0].length > 0){
        this.conf = true
      }
    }
  }
 
}
