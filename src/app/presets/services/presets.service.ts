import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';

import { PresetExamples } from '../models/presets-examples';
import { StorageService } from '../../storage';
import { Preset } from '../models';
import { parse } from 'path';

@Injectable({
  providedIn: 'root'
})
export class PresetsService {

  private presetList = new BehaviorSubject<Preset[]>([]);
  private selectedPreset = new BehaviorSubject<Preset>(undefined);

  constructor(private storageService: StorageService) { }

  getPresets(): Observable<Preset[]> {
    return this.presetList.asObservable();
  }

  getSelectedPreset(): Observable<Preset> {
    return this.selectedPreset.asObservable();
  }

  selectPreset(name: string) {
    this.selectedPreset.next(this.presetList.value.find(p => p.name === name));
  }

  loadPresets() {
    // for each file in preset folder
    // const presetsXml = [this.storageService.loadParsedFileToDom(), ...presetsXml
    const parser = new DOMParser();

    const presetsDocuments = PresetExamples.presetList.map((preset) => parser.parseFromString(preset, 'text/xml'));

    const mappedPresets = this.mapFromXmlToPresets(presetsDocuments);

    this.presetList.next(mappedPresets);
  }

  mapFromXmlToPresets(presetsXml: Document[]): Preset[] {
    return presetsXml.map((presetXml: Document) => this.mapFromXmlToPreset(presetXml));
  }

  mapFromXmlToPreset(presetXml: Document): Preset {
    const name = presetXml.getElementsByTagName('PresetName')[0].textContent;
    const requiredTags = presetXml.getElementsByTagName('Required')[0];
    const required = Object.values(requiredTags.children).map((element) => ({
      tag: element.tagName,
      key: element.getAttribute('key'),
      value: element.getAttribute('value')
    }));
    return { name, required } as Preset;
  }

  extractRequiredValues(fullDocument: Document, preset: Preset): Element[] {
    return Object.values(fullDocument.children).filter(element => {

      const match = {
        tag: element.tagName,
        key: element.getAttribute('key')
      }

      return preset.required.includes(match)
    });
  }

  extractNotRequiredValues(fullDocument: Document, preset: Preset): Element[] {
    return Object.values(fullDocument.children).filter(element => {

      const match = {
        tag: element.tagName,
        key: element.getAttribute('key')
      }

      return !preset.required.includes(match)
    });
  }


}
