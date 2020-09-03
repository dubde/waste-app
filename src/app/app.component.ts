import { Component } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { PresetsService } from './presets';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { StorageService } from './storage';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private appWindowSizes: { width: number, height: number };

  presetsList$: Observable<string[]>;


  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    private presetsService: PresetsService,
    private storageService: StorageService
  ) {
    this.translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }
  }

  ngOnInit(): void {
    this.presetsList$ = this.presetsService.getPresets().pipe(pluck('name'));

    this.presetsService.loadPresets();
  }

  selectPreset(name: string) {
    this.presetsService.selectPreset(name);
  }

  loadWebConfigChange(event) {
    const file = event.target.files[0] as File;
    this.storageService.loadFileToDom(file);
  }

  onMinimizeButton(): void {
    const appWindow = this.electronService.remote.getCurrentWindow();
    appWindow.minimize();
  }

  onExpandButton(): void {
    const appWindow = this.electronService.remote.getCurrentWindow();
    if (appWindow.isMaximizable()) {
      [this.appWindowSizes.width, this.appWindowSizes.height] = appWindow.getSize();
      appWindow.maximize();
      appWindow.setResizable(false);
    } else {
      appWindow.setSize(this.appWindowSizes.width, this.appWindowSizes.height, true)
    }
  }

  onCloseButton(): void {
    const appWindow = this.electronService.remote.getCurrentWindow();
    appWindow.close();
  }
}
