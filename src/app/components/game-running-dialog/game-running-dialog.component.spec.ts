import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRunningDialogComponent } from './game-running-dialog.component';

describe('GameRunningDialogComponent', () => {
  let component: GameRunningDialogComponent;
  let fixture: ComponentFixture<GameRunningDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameRunningDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameRunningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
