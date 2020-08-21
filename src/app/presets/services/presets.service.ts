import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

import { PresetExamples } from '../models/presets-examples';

@Injectable({
  providedIn: 'root'
})
export class PresetsService {

  constructor() { }

  presetsList(): Observable<string[]> {
    return of(PresetExamples.presetList);
  }
}
