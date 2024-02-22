import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

//Rafael Hassegawa - 21//02/2024
import { PessoasService } from './Pessoas.Services';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppComponent } from './app.component';
import { PessoasComponent } from './Components/pessoas-component/pessoas.component';

@NgModule({
  declarations: [AppComponent, PessoasComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ],
  providers: [HttpClientModule, PessoasService],
  bootstrap: [AppComponent],
})
export class AppModule { }
