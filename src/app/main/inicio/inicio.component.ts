import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  sToken: string = "";
  sUsua: string;
  fechNaci:any;
  fA: Date = new Date();
  fN!: Date;
  resu: any = []
  habi: any = []
  recu: any = []
  indi: any = []
  tiem!: number;

  constructor(private ser:ServiciosService, pRuta: Router) { 
    this.sToken = sessionStorage.getItem('token') || "";
    this.sUsua = sessionStorage.getItem('username') || '';
    if (this.sToken.length === 0) { pRuta.navigateByUrl('/login'); }
    else{
      ser.get_actividades_libro().subscribe(res => {
        this.resu = res;
      }) 
      ser.get_habilidades().subscribe(h => {
        this.habi = h;
      })
      ser.get_indicadores().subscribe(i => {
        this.indi = i;
        console.log(this.indi)
      })
    }
  }

  ngOnInit(): void {
    this.fechNaci = sessionStorage.getItem('dFechaNac') || '';
    this.fN = new Date(this.fechNaci.split('T')[0].split('-')[0], this.fechNaci.split('T')[0].split('-')[1]-1, this.fechNaci.split('T')[0].split('-')[2])
    this.tiem = this.fA.getFullYear() - this.fN.getFullYear()
    if(this.fA.getMonth() < this.fN.getMonth()){
      if(this.fA.getDay() < this.fN.getDay()){
        this.tiem = this.tiem - 1
      }
    }
    console.log(this.tiem);
  }
} 
