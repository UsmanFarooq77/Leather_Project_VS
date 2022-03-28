import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', component: SettingsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
