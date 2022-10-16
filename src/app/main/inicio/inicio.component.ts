import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  diagLeng: any;
  diagnosticoMed: any;
  fA: Date = new Date();
  fN!: Date;

  resu: any;
  displayedColumnsAL: string[] = ['actividades']
  dataSourceActiLibr!: MatTableDataSource<any>
  @ViewChild('paginatorAL') paginatorAL: MatPaginator
  sliceOptionsAL = {
    start: 0,
    end: 100,
    default: 100
  }

  habi: any;
  displayedColumnsH: string[] = ['Habilidad']
  dataSourceHabi!: MatTableDataSource<any>
  @ViewChild('paginatorH') paginatorH: MatPaginator
  sliceOptionsH = {
    start: 0,
    end: 100,
    default: 100
  }

  tiem!: number;
  page_acti: number = 1;
  page_habi: number = 1;
  page_act_dis: number = 1;
  capa_espe: boolean = sessionStorage.getItem('dCapacidadEsp') == 'true' ? true : false;
  habilidad: string;
  actividad_especial: string;
  one_actividad_especial: string;

  some_acti_disc: any;
  displayedColumnsAD: string[] = ['Actividad'];
  dataSourceActiDisc!: MatTableDataSource<any>
  @ViewChild('paginatorAD') paginatorAD: MatPaginator
  sliceOptionsAD = {
    start: 0,
    end: 100,
    default: 100
  }

  some_acti_disc_2: any;
  displayedColumnsAD2: string[] = ['Actividad'];
  dataSourceActiDisc2!: MatTableDataSource<any>
  @ViewChild('paginatorAD2') paginatorAD2: MatPaginator
  sliceOptionsAD2 = {
    start: 0,
    end: 100,
    default: 100
  }

  some_acti_disc_3: any;
  displayedColumnsAD3: string[] = ['Actividad'];
  dataSourceActiDisc3!: MatTableDataSource<any>
  @ViewChild('paginatorAD3') paginatorAD3: MatPaginator
  sliceOptionsAD3 = {
    start: 0,
    end: 100,
    default: 100
  }

  acti_disc: any;
  displayedColumnsAE: string[] = ['Actividad'];
  dataSourceActiEspe!: MatTableDataSource<any>
  @ViewChild('paginatorAE') paginatorAE: MatPaginator
  sliceOptionsAE = {
    start: 0,
    end: 100,
    default: 100
  }

  acti_reci: any;
  displayedColumnsAR: string[] = ['Habilidad'];
  dataSourceActiReci!: MatTableDataSource<any>
  @ViewChild('paginatorAR') paginatorAR: MatPaginator
  sliceOptionsAR = {
    start: 0,
    end: 100,
    default: 100
  }

  acti_disc_reci: any;
  displayedColumnsADR: string[] = ['Habilidad'];
  dataSourceActiDiscReci!: MatTableDataSource<any>
  @ViewChild('paginatorADR') paginatorADR: MatPaginator
  sliceOptionsADR = {
    start: 0,
    end: 100,
    default: 100
  }

  acti_reco_pr: any;
  displayedColumnsARPR: string[] = ['actividades'];
  dataSourceActiRecoPR!: MatTableDataSource<any>
  @ViewChild('paginatorARPR') paginatorARPR: MatPaginator
  sliceOptionsARPR = {
    start: 0,
    end: 100,
    default: 100
  }

  acti_reco_disc_pr: any;
  displayedColumnsARDPR: string[] = ['Actividad'];
  dataSourceActiRecoDiscPR!: MatTableDataSource<any>
  @ViewChild('paginatorARDPR') paginatorARDPR: MatPaginator
  sliceOptionsADRPR = {
    start: 0,
    end: 100,
    default: 100
  }

  acti_leng: any;
  displayedColumnsALe: string[] = ['Habilidad'];
  dataSourceActiLeng!: MatTableDataSource<any>
  @ViewChild('paginatorALe') paginatorALe: MatPaginator
  sliceOptionsALe = {
    start: 0,
    end: 100,
    default: 100
  }
  
  constructor(private ser:ServiciosService, private pRuta: Router) {}

  ngOnInit(): void {
    //this.sToken = sessionStorage.getItem('token') || "";
    //this.sUsua = sessionStorage.getItem('username') || '';
    //this.capa_espe = sessionStorage.getItem('dCapacidadEsp') == 'true' ? true : false;
    if (this.sToken.length === 0) { this.pRuta.navigateByUrl('/login'); }
    else{
      console.log(this.capa_espe)
      if(this.capa_espe == true){
        this.diagLeng = sessionStorage.getItem('dDiagnosticoLen').split(",");
        this.diagnosticoMed = sessionStorage.getItem('dDiagnosticoMed').split(",");
        console.log(this.diagnosticoMed)
        if (this.diagnosticoMed.length == 1) {
          console.time("actividades discapacidad 1")
          console.log(this.diagnosticoMed[0])
          this.ser.set_act_dis(this.diagnosticoMed[0]).subscribe(acdi => {
            this.some_acti_disc = acdi
            //console.log(this.some_acti_disc)
            this.dataSourceActiDisc = new MatTableDataSource(this.some_acti_disc)
            this.dataSourceActiDisc.paginator = this.paginatorAD
          })
          console.timeEnd("actividades discapacidad 1")
        }else if(this.diagnosticoMed.length == 2){
          console.time("actividades discapacidad 1,2")
          this.ser.set_act_dis(this.diagnosticoMed[0]).subscribe(acdi => {
            this.some_acti_disc = acdi
            this.dataSourceActiDisc = new MatTableDataSource(this.some_acti_disc)
            this.dataSourceActiDisc.paginator = this.paginatorAD
          })
          this.ser.set_act_dis(this.diagnosticoMed[1]).subscribe(acdi2 => {
            this.some_acti_disc_2 = acdi2
            this.dataSourceActiDisc2 = new MatTableDataSource(this.some_acti_disc_2)
            this.dataSourceActiDisc2.paginator = this.paginatorAD2
          })
          console.timeEnd("actividades discapacidad 1,2")
        }else if(this.diagnosticoMed.length == 3){
          console.time("actividades discapacidad 1,2,3")
          this.ser.set_act_dis(this.diagnosticoMed[0]).subscribe(acdi => {
            this.some_acti_disc = acdi
            this.dataSourceActiDisc = new MatTableDataSource(this.some_acti_disc)
            this.dataSourceActiDisc.paginator = this.paginatorAD
          })
          this.ser.set_act_dis(this.diagnosticoMed[1]).subscribe(acdi2 => {
            this.some_acti_disc_2 = acdi2
            this.dataSourceActiDisc2 = new MatTableDataSource(this.some_acti_disc_2)
            this.dataSourceActiDisc2.paginator = this.paginatorAD2
          })
          this.ser.set_act_dis(this.diagnosticoMed[2]).subscribe(acdi3 => {
            this.some_acti_disc_3 = acdi3
            this.dataSourceActiDisc3 = new MatTableDataSource(this.some_acti_disc_3)
            this.dataSourceActiDisc3.paginator = this.paginatorAD3
          })
          console.timeEnd("actividades discapacidad 1,2,3")
        }
        this.ser.set_act_reco_disc_pr(this.diagnosticoMed).subscribe(ac_reco_disc_pr => {
          console.time("actividades especiales recomendadas")
          this.acti_reco_disc_pr = ac_reco_disc_pr
          this.dataSourceActiRecoDiscPR = new MatTableDataSource(this.acti_reco_disc_pr)
          this.dataSourceActiRecoDiscPR.paginator = this.paginatorARDPR
          console.timeEnd("actividades especiales recomendadas")
        })
        this.ser.set_act_dis_rece(this.diagnosticoMed).subscribe(ac_di_reci => {
          console.time("actividades discapacidad recientes")
          this.acti_disc_reci = ac_di_reci
          this.dataSourceActiDiscReci = new MatTableDataSource(this.acti_disc_reci)
          this.dataSourceActiDiscReci.paginator = this.paginatorADR
          console.timeEnd("actividades discapacidad recientes")
        })
        console.log(this.diagLeng)
        if(this.diagLeng.length >= 1){
          this.ser.get_acti_leng().subscribe(ac_le => {
            console.time("actividades de lenguaje")
            this.acti_leng = ac_le
            //console.log(this.acti_leng)
            this.dataSourceActiLeng = new MatTableDataSource(this.acti_leng)
            this.dataSourceActiLeng.paginator = this.paginatorALe
            console.timeEnd("actividades de lenguaje")
          })
        }

        ///this.ser.set_act_dis(this.diagnosticoMed).subscribe(acdi => {
          /*this.some_acti_disc = acdi
          this.dataSourceActiDisc = new MatTableDataSource(this.some_acti_disc)
          console.log(this.dataSourceActiDisc)
          this.dataSourceActiDisc.filteredData[0].paginator = this.paginatorAD
          console.log(this.some_acti_disc)*/
        ///})
      }else{
        this.ser.get_actividades_libro().subscribe(res => {
          console.time("actividades");
          this.resu = res;
          this.dataSourceActiLibr = new MatTableDataSource(this.resu)
          console.log(this.dataSourceActiLibr.filteredData.length)
          this.dataSourceActiLibr.paginator = this.paginatorAL
          console.timeEnd('actividades');
        }) 
        this.ser.get_habilidades().subscribe(h => {
          console.time("habilidades");
          this.habi = h;
          this.dataSourceHabi = new MatTableDataSource(this.habi)
          this.dataSourceHabi.paginator = this.paginatorH
          console.timeEnd('habilidades');
        })
        this.ser.get_act_dis().subscribe(ac_di => {
          console.time("actividades especiales")
          this.acti_disc = ac_di
          this.dataSourceActiEspe = new MatTableDataSource(this.acti_disc)
          this.dataSourceActiEspe.paginator = this.paginatorAE
          //console.log(this.acti_disc)
          console.timeEnd("actividades especiales")
        })
        this.ser.get_act_rece().subscribe(ac_reci => {
          console.time("actividades recientes")
          this.acti_reci = ac_reci
          this.dataSourceActiReci = new MatTableDataSource(this.acti_reci)
          this.dataSourceActiReci.paginator = this.paginatorAR
          //console.log(this.acti_reci)
          console.timeEnd("actividades recientes")
        })
        this.ser.get_act_dis_rece().subscribe(ac_di_reci => {
          console.time("actividades discapacidad recientes")
          this.acti_disc_reci = ac_di_reci
          this.dataSourceActiDiscReci = new MatTableDataSource(this.acti_disc_reci)
          this.dataSourceActiDiscReci.paginator = this.paginatorADR
          console.timeEnd("actividades discapacidad recientes")
        })
        this.ser.get_act_reco_pr().subscribe(ac_reco_pr => {
          console.time("actividades recomendadas pr")
          this.acti_reco_pr = ac_reco_pr
          this.dataSourceActiRecoPR = new MatTableDataSource(this.acti_reco_pr)
          this.dataSourceActiRecoPR.paginator = this.paginatorARPR
          console.timeEnd("actividades recomendadas pr")
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
  onExpandTextAL(evt:any): void{
    this.sliceOptionsAL.end = this.sliceOptionsAL.end?undefined:this.sliceOptionsAL.default;
    console.log(this.sliceOptionsAL.end)
  }
  onExpandTextH(evt:any): void{
    this.sliceOptionsH.end = this.sliceOptionsH.end?undefined:this.sliceOptionsH.default;
    console.log(this.sliceOptionsH.end)
  }
  onExpandTextAE(evt:any): void{
    this.sliceOptionsAE.end = this.sliceOptionsAE.end?undefined:this.sliceOptionsAE.default;
    console.log(this.sliceOptionsAE.end)
  }
  onExpandTextAR(evt:any): void{
    this.sliceOptionsAR.end = this.sliceOptionsAR.end?undefined:this.sliceOptionsAR.default;
    console.log(this.sliceOptionsAR.end)
  }
  onExpandTextADR(evt:any): void{
    this.sliceOptionsADR.end = this.sliceOptionsADR.end?undefined:this.sliceOptionsADR.default;
    console.log(this.sliceOptionsADR.end)
  }
  onExpandTextAD(evt:any): void{
    this.sliceOptionsAD.end = this.sliceOptionsAD.end?undefined:this.sliceOptionsAD.default;
    console.log(this.sliceOptionsAD.end)
  }
  onExpandTextAD2(evt:any): void{
    this.sliceOptionsAD2.end = this.sliceOptionsAD2.end?undefined:this.sliceOptionsAD2.default;
    console.log(this.sliceOptionsAD2.end)
  }
  onExpandTextAD3(evt:any): void{
    this.sliceOptionsAD3.end = this.sliceOptionsAD3.end?undefined:this.sliceOptionsAD3.default;
    console.log(this.sliceOptionsAD3.end)
  }
  onExpandTextARPR(evt:any):void{
    this.sliceOptionsARPR.end = this.sliceOptionsARPR.end?undefined:this.sliceOptionsARPR.default;

  }
  onExpandTextALe(evt:any):void{
    this.sliceOptionsALe.end = this.sliceOptionsALe.end?undefined:this.sliceOptionsALe.default;
  }
  onExpandTextADRPR(evt: any): void{
    this.sliceOptionsADRPR.end = this.sliceOptionsADRPR.end?undefined:this.sliceOptionsADRPR.default;
  }
  applyFilterAL(event):void{
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceActiLibr.filter  = filterValue.trim().toLowerCase()
    if(this.dataSourceActiLibr.paginator){
      this.dataSourceActiLibr.paginator.firstPage()
    }
  }
  applyFilterH(event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceHabi.filter  = filterValue.trim().toLowerCase()
    if(this.dataSourceHabi.paginator){
      this.dataSourceHabi.paginator.firstPage()
    }
  }
  applyFilterAE(event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceActiEspe.filter  = filterValue.trim().toLowerCase()
    if(this.dataSourceActiEspe.paginator){
      this.dataSourceActiEspe.paginator.firstPage()
    }
  }

  applyFilterAR(event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceActiReci.filter  = filterValue.trim().toLowerCase()
    if(this.dataSourceActiReci.paginator){
      this.dataSourceActiReci.paginator.firstPage()
    }
  }

  applyFilterAD(event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceActiDisc.filter  = filterValue.trim().toLowerCase()
    if(this.dataSourceActiDisc.paginator){
      this.dataSourceActiDisc.paginator.firstPage()
    }
  }
  applyFilterAD2(event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceActiDisc2.filter  = filterValue.trim().toLowerCase()
    if(this.dataSourceActiDisc2.paginator){
      this.dataSourceActiDisc2.paginator.firstPage()
    }
  }
  applyFilterAD3(event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceActiDisc3.filter  = filterValue.trim().toLowerCase()
    if(this.dataSourceActiDisc3.paginator){
      this.dataSourceActiDisc3.paginator.firstPage()
    }
  }

  applyFilterADR(event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceActiDiscReci.filter  = filterValue.trim().toLowerCase()
    if(this.dataSourceActiDiscReci.paginator){
      this.dataSourceActiDiscReci.paginator.firstPage()
    }
  }
  applyFilterALe(event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceActiLeng.filter = filterValue.trim().toLowerCase()
    if(this.dataSourceActiLeng.paginator){
      this.dataSourceActiLeng.paginator.firstPage()
    }
  }
  
  
  /*SearchA(){
    //console.log(this.actividad.length)
    if(this.actividad == ""){
      this.ser.get_actividades_libro().subscribe(res => {
        console.time("actividades");
        this.resu = res;
        //this.totalActividades = this.resu.length;
        console.timeEnd('actividades');
      })
    }else if(this.actividad.length > 0){
      //console.log("elseif")
      this.resu = this.resu.filter(res => {
        return res.actividades?.toLocaleLowerCase().match(this.actividad.toLocaleLowerCase());
      })
    }
  }*/
  /*SearchH(){
    if(this.habilidad == ""){
      this.ser.get_habilidades().subscribe(h => {
        console.time("habilidades");
        this.habi = h;
        //console.log(this.habi)
        //this.totalHabilidades = this.habi.length;
        console.timeEnd('habilidades');
      })
    }else{
      this.habi = this.habi.filter(hab => {
        return hab.Habilidad?.toLocaleLowerCase().match(this.habilidad.toLocaleLowerCase());
      })
    }
  }*/
  /*searchAD(){
    if(this.actividad_especial == ""){
      this.ser.get_act_dis().subscribe(ac_di => {
        console.time("actividades especiales")
        this.acti_disc = ac_di
        ///console.log(this.acti_disc)
        console.timeEnd("actividades especiales")
      })
    }else{
      this.acti_disc = this.acti_disc.filter(acdi => {
        return acdi.Actividad?.toLocaleLowerCase().match(this.actividad_especial.toLocaleLowerCase());
      })

    }
  }*/
  searchOAD(i: number){
    if(this.one_actividad_especial == ""){
      if(this.capa_espe == true){
        this.diagnosticoMed = sessionStorage.getItem('dDiagnosticoMed').split(",");
        console.log(this.diagnosticoMed)
        this.ser.set_act_dis(this.diagnosticoMed).subscribe(acdi => {
          this.some_acti_disc = acdi
          console.log(this.some_acti_disc)
        })
      }
    }else{
      //console.log(this.some_acti_disc)
      //console.log(this.capa_espe)

      this.some_acti_disc[i] = this.some_acti_disc[i].filter(onacdi => {
        //console.log(onacdi)
        return onacdi.Actividad?.toLocaleLowerCase().match(this.one_actividad_especial.toLocaleLowerCase())
      })
      
      /*this.some_acti_disc = this.some_acti_disc.filter(onacdi => {
        //console.log(onacdi)
        return onacdi.Actividad?.toLocaleLowerCase().match(this.one_actividad_especial.toLocaleLowerCase())
      })*/
    }
  }
} 
