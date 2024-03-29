import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { HomeComponent } from './central/home/home.component';
import { DatatableComponent } from './central/datatable/datatable.component';
import { MapComponent } from './traxtrap/map/map.component';

const routes: Routes = [
  {path:'',component:MapComponent, pathMatch:'full'},
  {path:'login', component: LoginComponent, pathMatch: 'full'},
  {path:'home', component: HomeComponent, pathMatch: 'full'},
  {path:'datatables',component:DatatableComponent, pathMatch:'full'},
  {path:'map',component:MapComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
