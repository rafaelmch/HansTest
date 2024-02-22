import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoasComponent } from './Components/pessoas-component/pessoas.component';

const routes: Routes = [{
  //Rafael Hassegawa - 22/02/2024
  path: 'pessoas', component: PessoasComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
