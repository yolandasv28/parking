import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import {MapaComponent} from './components/mapa/mapa.component';


const routes: Routes = [
  {
    path:"",
    component: HomeComponent
  },
  {
    path:"mapa",
    component: MapaComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
