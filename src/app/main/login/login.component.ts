import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/Login';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public frmLogIn: FormGroup = Object.create(null);
  submitted = false;
  sToken: string = "";
  tReto: any;

  constructor(private formBuilder: FormBuilder, private ser:ServiciosService, private pRuta: Router) { }

  ngOnInit(): void {
    this.sToken = sessionStorage.getItem('token') || "";
    
    if (this.sToken.length > 0) { this.pRuta.navigate(['/inicio']); }
    else { sessionStorage.clear(); }
    this.frmLogIn = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });   
  }

  onSubmit(): void
  {
    this.submitted = true;
    // stop here if form is invalid
    if (this.frmLogIn.invalid) { return; }

    var dataUsua = new Login();
    dataUsua.username = this.frmLogIn.value.username;
    dataUsua.password = this.frmLogIn.value.password;
    //console.log("oS ", dataUsua)
    this.ser.logInJWT(dataUsua).subscribe(resu => {
      //console.log(resu)
      window.location.reload();
    })
  }
}
