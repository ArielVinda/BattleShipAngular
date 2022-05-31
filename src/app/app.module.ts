import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { GameRunningDialogComponent } from './components/game-running-dialog/game-running-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    GameRunningDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule
  ],
  providers: [],
  entryComponents: [
    GameRunningDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
