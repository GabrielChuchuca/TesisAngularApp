import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-recurso',
  templateUrl: './recurso.component.html',
  styleUrls: ['./recurso.component.css']
})
export class RecursoComponent implements OnInit {
  sToken: string = "";
  sUsua!: string;
  fechNaci:any;
  fA: Date = new Date();
  fN!: Date;
  recu: any = []
  sliceOptionsC = {
    start: 0,
    end: 100,
    default: 100
  }
  sliceOptionsJ = {
    start: 0,
    end: 100,
    default: 100
  }
  sliceOptionsV = {
    start: 0,
    end: 100,
    default: 100
  }
  iFrameUrl!: SafeResourceUrl;
  domSaniUrlsCuen: any = []
  domSaniUrlsJueg: any = []
  domSaniUrlsLibr: any = []
  domSaniUrlsVide: any = []
  band = false;
  tiem!: number;
  rol: string = sessionStorage.getItem('dRol');
  a: any;
  constructor(private ser:ServiciosService ,private route:ActivatedRoute, private pRuta:Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.sToken = sessionStorage.getItem('token') || "";
    this.sUsua = sessionStorage.getItem('username') || '';
    if (this.sToken.length === 0) { this.pRuta.navigateByUrl('/login'); }

    this.fechNaci = sessionStorage.getItem('dFechaNac') || '';
    this.fN = new Date(this.fechNaci.split('T')[0].split('-')[0], this.fechNaci.split('T')[0].split('-')[1]-1, this.fechNaci.split('T')[0].split('-')[2])
    this.tiem = this.fA.getFullYear() - this.fN.getFullYear()
    if(this.fA.getMonth() < this.fN.getMonth()){
      if(this.fA.getDay() < this.fN.getDay()){
        this.tiem = this.tiem - 1
      }
    }

    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.obtenerIdRecurso(id)
      this.ser.get_one_acti(id).subscribe(a => {
        ///console.log(a)
        if(a != null){
          this.a = a;
          ///console.log(this.a)
        }else{
          this.ser.get_one_habi(id).subscribe(h => {
            ///console.log(h)
            this.a = h;
            ///console.log(this.a)
            if(this.a == null){
              //console.log("if", id)
              this.ser.get_one_act_dis(id).subscribe(ad => {
                this.a = ad
                if(this.a == null){
                  this.ser.get_one_acti_reci(id).subscribe(ar => {
                    this.a = ar
                    if(this.a == null){
                      this.ser.get_one_acti_espe_reci(id).subscribe(aer => {
                        this.a = aer
                      })
                    }
                  })
                }
                ///console.log(this.a)
              })
            }
          })
        }  
      })
    }
  }
  onExpandTextC(evt:any): void{
    this.sliceOptionsC.end = this.sliceOptionsC.end?undefined:this.sliceOptionsC.default;
    console.log(this.sliceOptionsC.end)
  }
  onExpandTextJ(evt:any): void{
    this.sliceOptionsJ.end = this.sliceOptionsJ.end?undefined:this.sliceOptionsJ.default;
    console.log(this.sliceOptionsJ.end)
  }
  onExpandTextV(evt:any): void{
    this.sliceOptionsV.end = this.sliceOptionsV.end?undefined:this.sliceOptionsV.default;
    console.log(this.sliceOptionsV.end)
  }

  goto(i: string){
    /*console.log('/recurso/'+i)
    this.pRuta.navigateByUrl('/recurso/'+i);
    window.location.reload();*/

  }
  obtenerIdRecurso(id: string){
    this.ser.get_one_resource(id).subscribe(rec => {
      this.recu = rec;
      //console.log(this.recu)
      if (this.recu[0][0].length == 0 && this.recu[0][1].length == 0 && this.recu[0][2].length == 0 && this.recu[0][3].length == 0 && this.recu[0][4].length == 0 && this.recu[0][5].length == 0) {
        alert("No se encontro ningun recurso");
        this.pRuta.navigateByUrl('/inicio');
      }
      if(this.recu[0][1].length > 0){
        for(let i = 0; i < this.recu[0][1].length; i++){
          this.domSaniUrlsCuen.push(this.sanitizer.bypassSecurityTrustResourceUrl(this.recu[0][1][i].url));
        }
      }
      if(this.recu[0][2].length > 0){
        for(let i = 0; i < this.recu[0][2].length; i++){
          this.domSaniUrlsJueg.push(this.sanitizer.bypassSecurityTrustResourceUrl(this.recu[0][2][i].url));
        }
      }
      if(this.recu[0][3].length > 0){
        for(let i = 0; i < this.recu[0][3].length; i++){
          this.domSaniUrlsLibr.push(this.sanitizer.bypassSecurityTrustResourceUrl(this.recu[0][3][i].url));
        }
      }
      if(this.recu[0][5].length > 0){
        for(let i = 0; i < this.recu[0][5].length; i++){
          if(this.recu[0][5][i].texto != undefined){
            this.band = true;
          }
          this.domSaniUrlsVide.push(this.sanitizer.bypassSecurityTrustResourceUrl(this.recu[0][5][i].url.replace('watch?v=', 'embed/')));
        }
      }
    })
  }
}
