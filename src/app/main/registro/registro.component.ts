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
  sToken: string = "";


  constructor(private ser:ServiciosService,private builder: FormBuilder, private pRu:Router) { }

  ngOnInit(): void {
    this.sToken = sessionStorage.getItem('token') || "";
    
    if (this.sToken.length > 0) { this.pRu.navigate(['/inicio']); }
    else { sessionStorage.clear(); }
    /*this.formularioN = this.builder.group({
      cedula: ['', Validators.compose([Validators.maxLength(10), Validators.required, Validators.pattern('[0-9]*')])],
      apellido: ['', Validators.compose([Validators.required, Validators.pattern("[a-zA-ZáéíóúñÑ ]*")])],
      nombres: ['', Validators.compose([Validators.required, Validators.pattern("[a-zA-ZáéíóúñÑ ]*")])],
      unidadEducativa: ['', Validators.compose([Validators.required])],
    })*/
  }


  regN(){
    console.log(this.nUsuario)
    this.ser.nuevoUsuario(this.nUsuario).subscribe(resu => {
      if (resu.message == "El usuario ya existe"){
        alert(resu.message)
      }else{
        alert(resu.message)
        this.pRu.navigateByUrl('/login')
      }
    })
  }
  userNamengmodelchange(value:any){
    this.nUsuario.fechaNacimiento = value;
    console.log(this.nUsuario.fechaNacimiento)  //undefined
  }
}
