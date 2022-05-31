import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoSettingsDialogComponent } from './no-settings-dialog.component';

describe('NoSettingsDialogComponent', () => {
  let component: NoSettingsDialogComponent;
  let fixture: ComponentFixture<NoSettingsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoSettingsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
