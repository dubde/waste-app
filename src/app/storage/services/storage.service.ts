import { Injectable } from '@angular/core';
//import * as fs from 'fs';

import { WebConfigMock } from '../models/webconfig';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private localPath: string;
  private serializer = new XMLSerializer();
  private parser = new DOMParser();

  private _fileParsedSubject = new BehaviorSubject<Document>(null);

  constructor() { }

  loadFileToDom(file: File): Observable<Document> {
    const fileReader = new FileReader();

    fileReader.onload = (e: ProgressEvent<FileReader>) => {
      const data: any = e.target.result;

      const parser = new DOMParser();

      const fileParsed = parser.parseFromString(data, 'text/xml');
      console.log(data, fileParsed);
      this._fileParsedSubject.next(fileParsed);
    };

    fileReader.readAsText(file);

    return this._fileParsedSubject.asObservable();
  }

  getDocumentFile(): Observable<Document> {
    return this._fileParsedSubject.asObservable();
  }

  watchFile() { }

  saveFile(file: Document) {
    const serializedDoc = this.serializer.serializeToString(file);
    // fs.writeFileSync(this.localPath + 'Web.config', serializedDoc);
  }
}
