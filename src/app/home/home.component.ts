import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage';
import { PresetsService } from '../presets';
import { Observable, Subscription } from 'rxjs';
import { Preset } from 'app/presets/models';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private subscriptions = new Subscription();
  private xmlDoc$: Observable<Document>;
  requestedNodes$: Observable<Element[]>;
  allOtherNodes$: Observable<Element[]>;
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

    this.xmlDoc$ = this.storageService.getDocumentFile().pipe(filter(doc => doc !== null));

    this.selectedPreset$ = this.presetsService.getSelectedPreset();

    this.requestedNodes$ = this.xmlDoc$.pipe(
      map((xmlDoc) => Object.values(xmlDoc.getElementsByTagName('add')).filter((e: Element) => requestedKeys.includes(e.getAttribute('key'))))
    );

    this.allOtherNodes$ = this.xmlDoc$.pipe(
      map((xmlDoc) => Object.values(xmlDoc.getElementsByTagName('add')).filter((e: Element) => !requestedKeys.includes(e.getAttribute('key'))))
    );
  }

  loadXmlFile(): void {
  }

  writeXmlFile(): void {

  }
}
