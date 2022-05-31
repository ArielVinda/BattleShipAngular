import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NoSettingsDialogComponent } from './components/no-settings-dialog/no-settings-dialog.component';
import { DialogService } from './services/dialog.service';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BattleShip - Angular';

  constructor(
    protected router: Router,
    protected settingsServices: SettingsService,
    protected dialog: DialogService
  ) {}

  navigate(path: string) {
    if (path === 'play' && !this.settingsServices.getUserSettings()) {
      this.dialog.open(NoSettingsDialogComponent, {config: {hasBackdrop: true}});
    } else {
      this.router.navigate([path]);
    }
  }

  isRouteActive(path: string): boolean {
    return this.router.isActive(path, false);
  }
}
