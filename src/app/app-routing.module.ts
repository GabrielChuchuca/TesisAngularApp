import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './main/inicio/inicio.component';
import { LoginComponent } from './main/login/login.component';
import { NuevaactividadComponent } from './main/nuevaactividad/nuevaactividad.component';
import { RecursoComponent } from './main/recurso/recurso.component';
import { Recurso2Component } from './main/recurso2/recurso2.component';
import { RegistroComponent } from './main/registro/registro.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'nuevaactividad',
    component: NuevaactividadComponent
  },
  {
    path: 'recurso/:id',
    component: RecursoComponent
  },
  {
    path: 'recurso2/:id',
    component: Recurso2Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
