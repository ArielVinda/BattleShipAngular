import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { GameFinishedDialogComponent } from './components/game-finished-dialog/game-finished-dialog.component';
import { GameRunningDialogComponent } from './components/game-running-dialog/game-running-dialog.component';
import { NoSettingsDialogComponent } from './components/no-settings-dialog/no-settings-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    GameRunningDialogComponent,
    GameFinishedDialogComponent,
    NoSettingsDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule
  ],
  providers: [],
  entryComponents: [
    GameRunningDialogComponent,
    GameFinishedDialogComponent,
    NoSettingsDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
