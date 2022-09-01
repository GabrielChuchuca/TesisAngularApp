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
  lIndi: any;
  nindi: boolean = false
  ca_es: boolean = false 
  icd10_l: any;
  icd10_m: any;
  l_icd10_m: any;
  l_icd10_l: any;
  page_diagm: number = 1;
  page_diagl: number = 1;
  l_act_nue: any;
  codi: string
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
    this.ca_es = false
    this.nNew_acti.capa_espe = this.ca_es
    console.log(this.nNew_acti)
  }
  /* Metodo que cambia el valor que se selecciona de la lista de indicadores disponibles */
  onIndiChange(event){
    //console.log(event.value)
    this.nNew_acti.indicadores = event.value
    console.log(this.nNew_acti)
  }
  
  /* Metodo que cambia el Area */
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
  /* Metodo que cambia el Bloque */
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
  /* Metodo que cambia la Competencia */
  onCompChange(event){
    console.log(event.value)
    this.nNew_acti.Competencia = event.value
    console.log(this.nNew_acti)
  }

  /* Metodo para seleccionar una de las dos opciones Actividad o Habilidad */
  options_new(value:any){
    console.log(value)
    if (value === 'Actividad') {
      this.ser.get_indicadores().subscribe(i => {
        this.lIndi = i
        //console.log(this.lIndi)
      })
      this.lBloq1 = []
      this.lComp1 = [] 
      if(!this.ca_es){
        this.ca_es = false
      }else{
        this.ca_es == true
      }
      console.log(this.ca_es)
      this.nNew_acti.capa_espe = this.ca_es
      delete this.nNew_acti.Area
      delete this.nNew_acti.Bloque
      delete this.nNew_acti.Competencia
      console.log(this.nNew_acti)
    }else if(value === 'Habilidad'){
      if(!this.ca_es){
        this.ca_es = false
      }else{
        this.ca_es == true
      }
      this.nNew_acti.capa_espe = this.ca_es
      delete this.nNew_acti.indicadores
      this.nNew_acti.Area = ""
      console.log(this.nNew_acti)
      ///this.nNew_acti.Area = ""
      ///console.log(this.nNew_acti.indicadores)
    }
    
  }

  /* Metodo que recibe el nombre de la Actividad/Habilidad */
  get_new_ac(value: any){
    //console.log(value)
    if (value === '') {
      this.option = ''
      this.lBloq1 = []
      this.lComp1 = [] 
    }else{
      if(this.nNew_acti.indicadores === ""){
        this.nNew_acti.indicadores = "";
        this.nNew_acti.Habilidad = value
        console.log(this.nNew_acti)
      }
      this.nNew_acti.Habilidad = value
      console.log(this.nNew_acti)
    }
  }

  /* Metodo que recibe el indicador manualmente */
  get_new_in(value: any){
    console.log(this.nNew_acti)
    if (value !== '') {
      this.nNew_acti.indicadores = value;
    }
  }

  /* Metodo para guardar una solo actividad/habilidad a la vez */
  reg_new_ah(){
    console.log(this.nNew_acti)
    //this.a = {'Habilidad': 'dss', 'Area': 'sdsdssss'}
    this.l_act_nue = []
    this.l_act_nue.push(this.nNew_acti)
    this.ser.new_acti_habi(this.l_act_nue).subscribe(re_ac_ha => {
      console.log(re_ac_ha)
      /*if(re_ac_ha.message == 'Nueva Habilidad Guardada'){
        alert(re_ac_ha.message)

        this.lIdRecu.push(re_ac_ha.id)
        console.log(this.lIdRecu)*/
      this.ser.obtener_recurso(re_ac_ha).subscribe(oo => {
        console.log(oo)
      })
      this.nNew_acti.Habilidad = ""
      if(this.nNew_acti.indicadores != undefined){
        delete this.nNew_acti.indicadores
      }else if(this.nNew_acti.Area != undefined && this.nNew_acti.Bloque != undefined && this.nNew_acti.Competencia != undefined){
        delete this.nNew_acti.Area
        delete this.nNew_acti.Bloque
        delete this.nNew_acti.Competencia
      }
      //}
      console.log(this.nNew_acti)
      this.option = ""
      this.ca_es = false
      this.l_icd10_m = []
      this.l_icd10_l = []
      console.log(this.lIdRecu)
        //window.location.reload()
    })
  }

  /* Metodo para guardar varias actividades/habilidades desde un archivo csv */
  reg_news_ah(){
    //console.log(this.linesR[0])
    if (this.linesR[0].length > 0) {
      console.log(this.linesR[0])
      this.l_act_nue = []
      let c = 0
      for (let index = 0; index < this.linesR[0].length; index++) {
        //console.log(this.linesR[0][index]);
        this.nNew_acti = new NuevaActividad()
        this.nNew_acti.Habilidad = this.linesR[0][index][3]
        this.nNew_acti.Area = this.linesR[0][index][0]
        this.nNew_acti.Bloque = this.linesR[0][index][1]
        this.nNew_acti.Competencia = this.linesR[0][index][2]
        if(this.ca_es){
          this.nNew_acti.capa_espe = true
          this.nNew_acti.codigo = this.codi
        }else{
          this.nNew_acti.capa_espe = false
        }
        c += 1
        console.log(c)
        console.log(this.nNew_acti)
        this.l_act_nue.push(this.nNew_acti)
        
        //c += 1
        
        //console.log(this.l_act_nue)
        
        /////this.ser.new_acti_habi(this.nNew_acti).subscribe(re_ac_ha =>{
          //if(re_ac_ha.message == 'Nueva Habilidad Guardada'){
            //console.log(re_ac_ha)
          //this.acti_guar = {}
          //console.log(c)

          
            //console.log(this.linesR[0].length)
          //console.log(typeof(this.acti_guar.id))
          
          //this.ser.obtener_recurso(this.lIdRecu).subscribe(oo => {
          //  console.log(oo)
          //})
            //this.lIdRecu.push(re_ac_ha.id)
            
            
            /*this.nNew_acti.Habilidad = ""
            if(this.nNew_acti.indicadores != undefined){
              delete this.nNew_acti.indicadores
            }else if(this.nNew_acti.Area != undefined && this.nNew_acti.Bloque != undefined && this.nNew_acti.Competencia != undefined){
              delete this.nNew_acti.Area
              delete this.nNew_acti.Bloque
              delete this.nNew_acti.Competencia
            }*/
    
          //}
        ///})

      }
      console.log(this.l_act_nue)
      
      this.ser.new_acti_habi(this.l_act_nue).subscribe(re_ac => {
        console.log(re_ac)
        this.ser.obtener_recurso(re_ac).subscribe(oo => {
          console.log(oo)
        })
      })
      /*this.ser.obtener_recurso(this.lIdRecu).subscribe(oo => {
        console.log(oo)
      })*/
      //alert('Nuevas Habilidades Guardadas')
    }
    
  }

  /* Metodo para poder subir un archivo csv */
  selectFile(files: Event,): void {
    delete this.nNew_acti.Area
    delete this.nNew_acti.Bloque
    delete this.nNew_acti.Competencia
    delete this.nNew_acti.indicadores
    this.option = ""
    this.nNew_acti.Habilidad = ""
    console.log((files.target as HTMLInputElement) .files)
    let file : File = (files.target as HTMLInputElement) .files.item(0);
    console.log(typeof(file))
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
      console.log(this.nNew_acti)
    }
    
  }

  /* Metodo que indica si se añade un nuevo indicador manualmente */
  indi(value: any){
    this.nindi = value
    if (this.nindi == true) {
      this.nNew_acti.indicadores = ""
      
    }else{
      this.nNew_acti.indicadores = ""
    }
  }

  /* Metodo para poder añadir capacidad especial para las actividades */
  c_e(value: any){
    this.ca_es = value
    if (this.ca_es == true) {
      this.nNew_acti.capa_espe = true
      this.nNew_acti.codigo = ""
      this.ser.get_icd10().subscribe(icd => {
        this.l_icd10_m = icd;
        for (let i = 0; i < this.l_icd10_m.length; i++) {
          this.l_icd10_m[i].selected = false;
        }
      })
      this.ser.get_icd10lan().subscribe(icdlan => {
        this.l_icd10_l = icdlan
        //console.log(this.l_icd10_l)
        for (let index = 0; index < this.l_icd10_l.length; index++) {
          this.l_icd10_l[index].selected = false
          
        }
      })
    }else{
      this.nNew_acti.capa_espe = false
      delete this.nNew_acti.codigo
    }
    console.log(this.nNew_acti)
  }

  /* Metodo para buscar codigo de diagnostico medico */
  SearchIM(){
    if(this.icd10_m == ""){
      ///this.ngOnInit()
      this.ser.get_icd10().subscribe(icd => {
        this.l_icd10_m = icd;
        /*for (let index = 0; index < this.nUsuario.diagnostico_medico.length; index++) {
          console.log(this.nUsuario.diagnostico_medico[index])
          for (let i = 0; i < this.l_icd10_m.length; i++) {
            this.l_icd10_m[i].selected = false;
            if(this.nUsuario.diagnostico_medico[index] === this.l_icd10_m[i].code){
              console.log("si")
              this.l_icd10_m[i].selected = true;
              console.log(this.l_icd10_m[i].selected)
            }
          }
        } */
        for (let i = 0; i < this.l_icd10_m.length; i++) {
          this.l_icd10_m[i].selected = false;
          if(this.nNew_acti.codigo === this.l_icd10_m[i].code){
            this.l_icd10_m[i].selected = true
          }
          /*for (let j = 0; j < this.nUsuario.diagnostico_medico.length; j++) {
            if (this.l_icd10_m[i].code === this.nUsuario.diagnostico_medico[j]) {
              this.l_icd10_m[i].selected = true
            }
          }*/
        }
      })
      //console.log(this.l_icd10_m)
    }else{
      this.l_icd10_m = this.l_icd10_m.filter(resm => {
        return resm.code?.toLocaleLowerCase().match(this.icd10_m.toLocaleLowerCase()) || resm.label[0]?.toLocaleLowerCase().match(this.icd10_m.toLocaleLowerCase());
      })
    }
  }

  /* Metodo para buscar por codigo el diagnostico de lenguaje */
  SearchIL(){
    console.log(this.icd10_l)
    if(this.icd10_l == ""){
      this.ser.get_icd10lan().subscribe(icdlan => {
        this.l_icd10_l = icdlan
        //console.log(this.l_icd10_l)
        /*for (let j = 0; j< this.nUsuario.diagnostico_lenguaje.length; j++) {
          for (let index = 0; index < this.l_icd10_l.length; index++) {
            this.l_icd10_l[index].selected = false
            if (this.nUsuario.diagnostico_lenguaje[j] === this.l_icd10_l[index].code) {
              this.l_icd10_l[index].selected = true
            }
          }
        }*/
        /*for (let i = 0; i < this.l_icd10_l.length; i++) {
          this.l_icd10_l[i].selected = false
          for (let j = 0; j < this.nUsuario.diagnostico_lenguaje.length; j++) {
            if (this.l_icd10_l[i].code === this.nUsuario.diagnostico_lenguaje[j]) {
              this.l_icd10_l[i].selected = true
            }
          }
        }*/
      })
    }else{
      console.log("else")
      this.l_icd10_l = this.l_icd10_l.filter(resl => {
        return resl.code?.toLocaleLowerCase().match(this.icd10_l.toLocaleLowerCase()) || resl.label[0]?.toLocaleLowerCase().match(this.icd10_l.toLocaleLowerCase()); 
      })
    }
  }

  /* Metodo para poder seleccionar un item de la tabla de diagnositco medico */
  onChangeM(e, i) {
    //console.log(this.nUsuario)
    if (e.checked === true) {
      this.codi = this.l_icd10_m[i].code
      this.nNew_acti.codigo = this.l_icd10_m[i].code
      //this.nUsuario.diagnostico_medico.push(this.l_icd10_m[i].code)
      //console.log(this.nUsuario.diagnostico_medico)
    }else if(e.checked === false){
      //this.indexOfM = this.nUsuario.diagnostico_medico.indexOf(this.l_icd10_m[i].code);
      //console.log(this.indexOfM)
      //if (this.indexOfM !== -1) {
        //this.nUsuario.diagnostico_medico.splice(this.indexOfM, 1);
      //}
      //console.log(this.nUsuario.diagnostico_medico)
    }
    console.log(this.nNew_acti)
  }
  /* Metodo para poder seleccionar un item de la tabla de diagnositco lengauje */
  onChangeL(e, i) {
    //console.log(this.nUsuario)
    if (e.checked === true) {
      //this.nUsuario.diagnostico_lenguaje.push(this.l_icd10_l[i].code)
      //console.log(this.nUsuario.diagnostico_lenguaje)
    }else if(e.checked === false){
      //this.indexOfL = this.nUsuario.diagnostico_lenguaje.indexOf(this.l_icd10_l[i].code);
      //console.log(this.indexOfL)
      //if (this.indexOfL !== -1) {
        //this.nUsuario.diagnostico_lenguaje.splice(this.indexOfL, 1);
      //}
      //console.log(this.nUsuario.diagnostico_lenguaje)
    }
  }
 
}
