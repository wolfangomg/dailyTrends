import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './feed-list/container.component';


const routes: Routes = [
  {
    path: 'home', component: ContainerComponent,
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
