import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './feed/default/default.component';
import { DetailedComponent } from './feed/detailed/detailed.component';


const routes: Routes = [
  {
    path: 'home', component: DefaultComponent
  },
  {
    path: 'home/:id', component: DetailedComponent
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full',
  },
  {
    path: '**', redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
