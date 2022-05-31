import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GameService, GameState } from 'src/app/services/game.service';
import { DialogService } from 'src/app/services/dialog.service';
import { SettingsDifficulty, SettingsDifficultyOption, SettingsForm, SettingsFormMode, SettingsService } from 'src/app/services/settings.service';
import { GameRunningDialogComponent } from 'src/app/components/game-running-dialog/game-running-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit, OnDestroy {

  settingsFormModeType = SettingsFormMode;

  gameState!: GameState;
  gameStateSubscription!: Subscription;

  form!: FormGroup;
  difficultyOptions!: Array<SettingsDifficultyOption>;

  constructor(
    protected fb: FormBuilder,
    public settingsService: SettingsService,
    public gameService: GameService,
    public dialog: DialogService,
    public router: Router
  ) { }

  get name() { return this.form.get('name'); }
  get turns() { return this.form.get('maxTurns'); }

  setMode(val: SettingsFormMode): void {
    this.form.patchValue({
      mode: val
    });
  }

  openDialog() {
    this.dialog.open(GameRunningDialogComponent, { 
      data: 'Please finish the game before trying to modify Settings!', 
      config: {
        hasBackdrop: true
      }
    }).afterClosed().subscribe(()=> {
      this.router.navigate(['play']);
    });
  }

  buildForm(): void {
    this.form = this.fb.group(
      {
        name: ['', [Validators.maxLength(22), Validators.required]],
        maxTurns: [10, [Validators.min(10), Validators.max(100)]],
        difficulty: [SettingsDifficulty.EASY],
        mode: [SettingsFormMode.PRESET]
      }
    );
  }

  setFormDefault(): void {
    let defaultForm = this.settingsService.getDefaultSettings();
    this.form.patchValue(
      {
        ...defaultForm
      }
    );
  }

  setForm(settings: SettingsForm) {
    this.form.patchValue(
      {
        ...settings
      }
    );
  }

  saveForm(): void {
    console.log(this.form.value);
    this.settingsService.writeSettings(this.form.value);
  }

  restoreForm(): void {
    this.setFormDefault();
  }

  ngOnInit(): void {
    this.gameStateSubscription = 
    this.gameService.getGameState().subscribe((res) => {
      console.log(res);
      this.gameState = res;
      if (this.gameState === GameState.ON || this.gameState ===  GameState.PAUSED) {
        this.openDialog();
      }
    });
    this.difficultyOptions = this.settingsService.getDifficultyOptions();
    this.buildForm();
    if (!this.settingsService.getUserSettings()) {
      this.setFormDefault();
    } else {
      this.setForm(this.settingsService.getUserSettings());
    }
  }

  ngOnDestroy(): void {
    this.gameStateSubscription.unsubscribe();
  }

}
