import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';

import { PresetExamples } from '../models/presets-examples';
import { StorageService } from '../../storage';
import { Preset } from '../models';
import { parse } from 'path';
import { map, tap } from 'rxjs/operators';

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

  filterRequiredNodes(documentToFilter: Document): Observable<Element[]> {
    return this.getSelectedPreset().pipe(map((preset) => this.extractRequiredValues(documentToFilter, preset)), tap(console.log));
  }

  filterOptionalNodes(documentToFilter: Document): Observable<Element[]> {
    return this.getSelectedPreset().pipe(map((preset) => this.extractNotRequiredValues(documentToFilter, preset)), tap(console.log));
  }

  private extractRequiredValues(fullDocument: Document, preset: Preset): Element[] {

    return preset.required.flatMap(({ tag, key, value }) => {
      const elements = fullDocument.getElementsByTagName(tag);
      return Object.values(elements).filter((element) => {
        if (element.getAttribute('key') === key) {
          if (!!value) {
            element.setAttribute('value', value);
          }
          return true;
        } else { return false; }
      })
    });
  }

  private extractNotRequiredValues(fullDocument: Document, preset: Preset): Element[] {
    const elements = fullDocument.children;
    return Object.values(elements).filter((element) => {
      const match = { tag: element.tagName, key: element.getAttribute('key') }
      return !preset.required.includes(match);
    })
  }
}
