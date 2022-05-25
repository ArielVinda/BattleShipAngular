import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsPageComponent } from './settings-page.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SettingsPageComponent
  }
];

@NgModule({
  declarations: [
    SettingsPageComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ]
})
export class SettingsPageModule { }
