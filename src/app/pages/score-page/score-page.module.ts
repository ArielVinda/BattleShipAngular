import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScorePageComponent } from './score-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: ScorePageComponent
  }
];

@NgModule({
  declarations: [
    ScorePageComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ]
})
export class ScorePageModule { }
