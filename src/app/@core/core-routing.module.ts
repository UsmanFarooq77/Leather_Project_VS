import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoreComponent } from './core/core.component';
import { HomeComponent } from './home/home.component';
import { LoginModelComponent } from '../@membership/login-model/login-model.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '', component: CoreComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
    ]
  },
  { path: 'login', component: LoginModelComponent },
  

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
