import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebConfigMock } from './models/webconfig';

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

  constructor(private router: Router) { }

  ngOnInit(): void {
    const requestedKeys = [
      'DevelopmentUserLogin',
      'IsInDevelopment'
    ];

    const parser = new DOMParser();
    const serializer = new XMLSerializer();
    const path = 'C:/inetpub/wwwroot/tcpdevlocal/Website/'
    // const file = fs.readFileSync(path + 'Web.config', 'utf8');
    const file = WebConfigMock.long;
    this.xmlDoc = parser.parseFromString(file, 'text/xml');

    this.requestedNodes = Object.values(this.xmlDoc.getElementsByTagName('add')).filter((e: Element) => requestedKeys.includes(e.getAttribute('key')));
    this.allOtherNodes = Object.values(this.xmlDoc.getElementsByTagName('add')).filter((e: Element) => !requestedKeys.includes(e.getAttribute('key')));
    const webconfig = serializer.serializeToString(this.xmlDoc);

    //  fs.writeFileSync(path + 'Web.config.test', webconfig);

  }

  loadXmlFile(): void {
  }

  writeXmlFile(): void {

  }
}
