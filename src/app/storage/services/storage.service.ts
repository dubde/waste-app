import { Injectable } from '@angular/core';
//import * as fs from 'fs';

import { WebConfigMock } from '../models/webconfig';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private localPath: string;
  private serializer = new XMLSerializer();
  private parser = new DOMParser();

  constructor() { }

  loadParsedFileToDom(path?: string): Document {
    // this.localPath = path ?? 'C:/inetpub/wwwroot/tcpdevlocal/Website/';
    // const file = fs.readFileSync(this.localPath + 'Web.config', 'utf8');

    const file = WebConfigMock.long;
    return this.parser.parseFromString(file, 'text/xml');
  }

  watchFile() { }

  saveFile(file: Document) {
    const serializedDoc = this.serializer.serializeToString(file);
    // fs.writeFileSync(this.localPath + 'Web.config', serializedDoc);
  }
}
