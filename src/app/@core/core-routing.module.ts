import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginModelComponent } from '../@membership/login-model/login-model.component';
import { LoginComponent } from '../@membership/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes : Routes = [
  {
    path: '', component: HomeComponent,
    // children: [
    //   {
    //     path: '',
    //     loadChildren: './../@components/components.module#ComponentsModule'
    //   },
    // ]
  },
  
  {
    path: 'login', component: LoginModelComponent
  },
  { path: '**', component: PageNotFoundComponent }

]
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class CoreRoutingModule { }
