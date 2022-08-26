import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  nUsuario: Usuario = new Usuario()
  
  formularioN! : FormGroup
  sToken: string = sessionStorage.getItem('token') || "";;
  rol: string = sessionStorage.getItem('dRol') || "";
  fechNaci: string = sessionStorage.getItem('dFechaNac') || '';
  sUsua: string = sessionStorage.getItem('username') || '';
  espe: boolean = false;
  macVersion: string = "";
  l_icd10_m: any;
  l_icd10_m2: any;
  l_icd10_l: any;
  icd10_l: any;
  icd10_m: any;
  page_diagm: number = 1;
  page_diagl: number = 1;
  indexOfM: number;
  indexOfL: number;
  fA: Date = new Date();
  fN!: Date;
  tiem!: number;
  corr: boolean = false;


  constructor(private ser:ServiciosService,private builder: FormBuilder, private pRu:Router) { }

  ngOnInit(): void {
    this.nUsuario.capacidad_especial = false
    //this.sToken = sessionStorage.getItem('token') || "";
    //this.rol = sessionStorage.getItem('dRol') || "";
    console.log(this.sToken)
    console.log(this.rol)
    if (this.sToken.length > 0 && this.rol.length > 0 && this.rol === 'usuario') { this.pRu.navigate(['/inicio']); }
    else if(this.sToken.length === 0){ sessionStorage.clear(); }

    

    /*this.formularioN = this.builder.group({
      cedula: ['', Validators.compose([Validators.maxLength(10), Validators.required, Validators.pattern('[0-9]*')])],
      apellido: ['', Validators.compose([Validators.required, Validators.pattern("[a-zA-ZáéíóúñÑ ]*")])],
      nombres: ['', Validators.compose([Validators.required, Validators.pattern("[a-zA-ZáéíóúñÑ ]*")])],
      unidadEducativa: ['', Validators.compose([Validators.required])],
    })*/
    console.log(this.fechNaci)
    if(this.fechNaci.length > 0){
      console.log(Number(this.fechNaci.split('T')[0].split('-')[0]), Number(this.fechNaci.split('T')[0].split('-')[1]), Number(this.fechNaci.split('T')[0].split('-')[2]))
      this.fN = new Date(Number(this.fechNaci.split('T')[0].split('-')[0]), Number(this.fechNaci.split('T')[0].split('-')[1]), Number(this.fechNaci.split('T')[0].split('-')[2]))
      console.log(this.fN.getFullYear())
      console.log(this.fA.getFullYear())
      this.tiem = this.fA.getFullYear() - this.fN.getFullYear()
      console.log(this.fN.getMonth())
      console.log(this.fA.getMonth()+1)
      if(this.fA.getMonth()+1 < this.fN.getMonth()){
        console.log(this.fN.getDay())
        console.log(this.fA.getDay())
        if(this.fA.getDay() < this.fN.getDay()){
          this.tiem = this.tiem - 1
        }
      }
      console.log(this.tiem)
    }
  }

  regN(){
    //this.nUsuario.rol = "usuario"
    
    if (this.nUsuario.rol == undefined) {
      this.nUsuario.rol = "usuario"
    }
    console.log(this.nUsuario)
    this.ser.nuevoUsuario(this.nUsuario).subscribe(resu => {
      if (resu.message == "El usuario ya existe" || resu.message == "El correo ya existe") {
        alert(resu.message)
      }else{
        alert(resu.message)
        this.pRu.navigateByUrl('/login')
      }
    })
  }
  userNamengmodelchange(value:any){
    this.nUsuario.fechaNacimiento = value;
    //console.log(this.nUsuario.fechaNacimiento)  //undefined
  }
  capa(value:any){
    this.nUsuario.capacidad_especial = value
    if (this.nUsuario.capacidad_especial == true) {
      this.nUsuario.capacidad_especial = true
      this.nUsuario.diagnostico_medico = []
      this.nUsuario.diagnostico_lenguaje = []
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
    }else if(this.nUsuario.capacidad_especial == false){
      this.nUsuario.capacidad_especial = false
      delete this.nUsuario.diagnostico_medico
      delete this.nUsuario.diagnostico_lenguaje
      this.l_icd10_m = []
      this.l_icd10_l = []
    }
    //console.log(this.nUsuario.capacidad_especial)  //undefined
  }
  correo(value:any){
    this.corr = value

    console.log(this.corr)  //undefined
    if(this.corr == true){
      this.nUsuario.correo = ""
      this.espe = false
      this.nUsuario.rol = "docente"
      delete this.nUsuario.diagnostico_medico
      delete this.nUsuario.diagnostico_lenguaje
      delete this.nUsuario.capacidad_especial
      
    }else{
      this.nUsuario.capacidad_especial = false
      delete this.nUsuario.correo
      delete this.nUsuario.rol
    }
    //delete this.nUsuario.capacidad_especial
    console.log(this.nUsuario)  //undefined
  }

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
          for (let j = 0; j < this.nUsuario.diagnostico_medico.length; j++) {
            if (this.l_icd10_m[i].code === this.nUsuario.diagnostico_medico[j]) {
              this.l_icd10_m[i].selected = true
            }
          }
        }
      })
      //console.log(this.l_icd10_m)
    }else{
      this.l_icd10_m = this.l_icd10_m.filter(resm => {
        return resm.code?.toLocaleLowerCase().match(this.icd10_m.toLocaleLowerCase()) || resm.label[0]?.toLocaleLowerCase().match(this.icd10_m.toLocaleLowerCase());
      })
    }
  }
  SearchIL(){
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
        for (let i = 0; i < this.l_icd10_l.length; i++) {
          this.l_icd10_l[i].selected = false
          for (let j = 0; j < this.nUsuario.diagnostico_medico.length; j++) {
            if (this.l_icd10_l[i].code === this.nUsuario.diagnostico_medico[j]) {
              this.l_icd10_l[i].selected = true
            }
          }
        }
      })
    }else{
      this.l_icd10_l = this.l_icd10_l.filter(resl => {
        return resl.code?.toLocaleLowerCase().match(this.icd10_l.toLocaleLowerCase()) || resl.label[0]?.toLocaleLowerCase().match(this.icd10_l.toLocaleLowerCase()); 
      })
    }
  }
  onChangeM(e, i) {
    console.log(this.nUsuario)
    if (e.checked === true) {
      this.nUsuario.diagnostico_medico.push(this.l_icd10_m[i].code)
      console.log(this.nUsuario.diagnostico_medico)
    }else if(e.checked === false){
      this.indexOfM = this.nUsuario.diagnostico_medico.indexOf(this.l_icd10_m[i].code);
      //console.log(this.indexOfM)
      if (this.indexOfM !== -1) {
        this.nUsuario.diagnostico_medico.splice(this.indexOfM, 1);
      }
      console.log(this.nUsuario.diagnostico_medico)
    }
  }

  onChangeL(e, i) {
    console.log(this.nUsuario)
    if (e.checked === true) {
      this.nUsuario.diagnostico_lenguaje.push(this.l_icd10_l[i].code)
      console.log(this.nUsuario.diagnostico_lenguaje)
    }else if(e.checked === false){
      this.indexOfL = this.nUsuario.diagnostico_lenguaje.indexOf(this.l_icd10_l[i].code);
      //console.log(this.indexOfL)
      if (this.indexOfL !== -1) {
        this.nUsuario.diagnostico_lenguaje.splice(this.indexOfL, 1);
      }
      console.log(this.nUsuario.diagnostico_lenguaje)
    }
  }
}
