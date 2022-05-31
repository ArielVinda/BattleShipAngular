import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GameService, GameState } from 'src/app/services/game.service';
import { SettingsDifficulty, SettingsDifficultyOption, SettingsFormMode, SettingsService } from 'src/app/services/settings.service';

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
    public gameService: GameService
  ) { }

  get name() { return this.form.get('name'); }
  get turns() { return this.form.get('maxTurns'); }

  setMode(val: SettingsFormMode): void {
    this.form.patchValue({
      mode: val
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

  saveForm(): void {

  }

  restoreForm(): void {
    this.setFormDefault();
  }

  ngOnInit(): void {
    this.gameStateSubscription = 
    this.gameService.getGameState().subscribe((res) => {
      this.gameState = res;
    });
    this.difficultyOptions = this.settingsService.getDifficultyOptions();
    this.buildForm();
    this.setFormDefault();
  }

  ngOnDestroy(): void {
    this.gameStateSubscription.unsubscribe();
  }

}
