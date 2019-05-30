import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { MapaComponent } from './components/mapa/mapa.component';

import {HttpClientModule} from '@angular/common/http';


// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    MapaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDfJO48nLxh390YRzexJrDRFRoLx9lRlac'
      // 'AIzaSyCh7rSz7BbqbYOdUcy7t0GTNgCaUxVvNmU'
         

    })
  ],
  providers: [GoogleMapsAPIWrapper],
  bootstrap: [AppComponent],

})
export class AppModule { }
