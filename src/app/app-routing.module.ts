import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsPageModule } from './pages/settings-page/settings-page.module';

const routes: Routes = [
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings-page/settings-page.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'play',
    loadChildren: () => import('./pages/play-page/play-page.module').then(m => m.PlayPageModule)
  },
  {
    path: 'score',
    loadChildren: () => import('./pages/score-page/score-page.module').then(m => m.ScorePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
