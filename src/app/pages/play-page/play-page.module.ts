import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayPageComponent } from './play-page.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PlayPageComponent
  }
];

@NgModule({
  declarations: [
    PlayPageComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ]
})
export class PlayPageModule { }
