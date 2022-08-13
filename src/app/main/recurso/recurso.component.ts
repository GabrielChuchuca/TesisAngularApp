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
  sUsua: string;
  recu: any = []
  iFrameUrl!: SafeResourceUrl;
  domSaniUrlsCuen: any[] = []
  domSaniUrlsJueg: any[] = []
  domSaniUrlsLibr: any[] = []
  domSaniUrlsVide: any[] = []
  band = false;

  constructor(private ser:ServiciosService ,private route:ActivatedRoute, private pRuta:Router, private sanitizer: DomSanitizer) { 
    this.sToken = sessionStorage.getItem('token') || "";
    this.sUsua = sessionStorage.getItem('username') || '';
    if (this.sToken.length === 0) { pRuta.navigateByUrl('/login'); }
   }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.obtenerIdRecurso(id)
    }
  }

  obtenerIdRecurso(id: string){
    this.ser.get_one_resource(id).subscribe(rec => {
      this.recu = rec;
      if (this.recu[0].length == 0 && this.recu[1].length == 0 && this.recu[2].length == 0 && this.recu[3].length == 0 && this.recu[4].length == 0 && this.recu[5].length == 0) {
        alert("No se encontro ningun recurso");
        this.pRuta.navigateByUrl('/inicio');
      }
      if(this.recu[1].length > 0){
        for(let i = 0; i < this.recu[1].length; i++){
          this.domSaniUrlsCuen.push(this.sanitizer.bypassSecurityTrustResourceUrl(this.recu[1][i].url));
        }
      }
      if(this.recu[2].length > 0){
        for(let i = 0; i < this.recu[2].length; i++){
          this.domSaniUrlsJueg.push(this.sanitizer.bypassSecurityTrustResourceUrl(this.recu[2][i].url));
        }
      }
      if(this.recu[3].length > 0){
        for(let i = 0; i < this.recu[3].length; i++){
          this.domSaniUrlsLibr.push(this.sanitizer.bypassSecurityTrustResourceUrl(this.recu[3][i].url));
        }
      }
      if(this.recu[5].length > 0){
        for(let i = 0; i < this.recu[5].length; i++){
          if(this.recu[5][i].texto != undefined){
            this.band = true;
          }
          this.domSaniUrlsVide.push(this.sanitizer.bypassSecurityTrustResourceUrl(this.recu[5][i].url.replace('watch?v=', 'embed/')));
        }
      }
    })
  }
}
