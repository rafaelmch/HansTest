import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

//Rafael Hassegawa - 21//02/2024
import { PessoasServices } from './Pessoas.Services';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
//import { PessoasComponentComponent } from './Components/pessoas-component/pessoas-component.component';

@NgModule({
  //declarations: [AppModule],
  imports: [
    // Rafael Hassegawa - 21/02/2024
    CommonModule, ReactiveFormsModule, ModalModule.forRoot(),
    BrowserModule, HttpClientModule,
    AppRoutingModule
  ],
  // Rafael Hassegawa - 21/02/2024 adding my providers
  providers: [HttpClientModule, PessoasServices],
  bootstrap: [PessoasServices]
})
export class AppModule { }
