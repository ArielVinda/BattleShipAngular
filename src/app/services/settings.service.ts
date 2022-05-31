import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Settings {
  name: string;
  maxTurns: number;
}

export enum SettingsFormMode {
  PRESET = 'PRESET',
  CUSTOM = 'CUSTOM'
}

export interface SettingsForm {
  name: string;
  maxTurns: number;
  difficulty: SettingsDifficulty; 
  mode: SettingsFormMode;
}

export enum SettingsDifficulty {
  EASY = "E",
  MEDIUM = 'M',
  HARD = 'H'
}

export interface SettingsDifficultyOption {
  name: string; 
  value: SettingsDifficulty;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private defaultSettingsForm: SettingsForm = {
    name: 'EXAMPLE',
    maxTurns: 100,
    difficulty: SettingsDifficulty.EASY, 
    mode: SettingsFormMode.PRESET
  }
  private userSettingsForm!: SettingsForm;

  private maxTurns!: number;
  private name!: string; 

  constructor() { }

  getDefaultSettings(): SettingsForm {
    return this.defaultSettingsForm;
  }

  getDifficultyOptions(): Array<SettingsDifficultyOption> {
    return [
      {
        name: 'Easy',
        value: SettingsDifficulty.EASY
      },
      {
        name: 'Medium',
        value: SettingsDifficulty.MEDIUM
      },
      {
        name: 'Hard',
        value: SettingsDifficulty.HARD
      }
    ];
  }

  writeSettings(settings: SettingsForm): void {
    this.userSettingsForm = settings;
    if (settings.mode === SettingsFormMode.PRESET) {
      switch (settings.difficulty) {
        case SettingsDifficulty.EASY: {
          this.maxTurns = 100;
          break;
        }
        case SettingsDifficulty.MEDIUM: {
          this.maxTurns = 50;
          break;
        }
        case SettingsDifficulty.HARD: {
          this.maxTurns = 25;
          break;
        }
      } 
    } else if (settings.mode === SettingsFormMode.CUSTOM) { // 'else if' is not needed, could be just 'else', leaving it just for clarity of code
      this.maxTurns = settings.maxTurns;
    }
    this.name = settings.name;
  }
  getUserSettings(): SettingsForm {
    return this.userSettingsForm;
  }
  getSettings(): Observable<Settings> {
    return new Observable<Settings>((observer) => {
      observer.next({
        name: this.name,
        maxTurns: this.maxTurns
      });

      return {
        unsubscribe() {
          // clean up
        }
      }
    })
  }
}
