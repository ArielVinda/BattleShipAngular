import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BattleShip - Angular';

  constructor(
    protected router: Router
  ) {}

  navigate(path: string) {
    this.router.navigate([path]);
  }

  isRouteActive(path: string): boolean {
    return this.router.isActive(path, false);
  }
}
