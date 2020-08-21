import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage';
import { PresetsService } from '../presets';
import { Observable } from 'rxjs';
import { Preset } from 'app/presets/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private xmlDoc: Document;
  requestedNodes: Element[];
  allOtherNodes: Element[];
  panelOpenState: boolean;

  selectedPreset$: Observable<Preset>;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private presetsService: PresetsService
  ) { }

  ngOnInit(): void {
    const requestedKeys = [
      'DevelopmentUserLogin',
      'IsInDevelopment'
    ];

    this.xmlDoc = this.storageService.loadParsedFileToDom();

    this.selectedPreset$ = this.presetsService.getSelectedPreset();

    this.requestedNodes = Object.values(this.xmlDoc.getElementsByTagName('add')).filter((e: Element) => requestedKeys.includes(e.getAttribute('key')));
    this.allOtherNodes = Object.values(this.xmlDoc.getElementsByTagName('add')).filter((e: Element) => !requestedKeys.includes(e.getAttribute('key')));
  }

  loadXmlFile(): void {
  }

  writeXmlFile(): void {

  }
}
