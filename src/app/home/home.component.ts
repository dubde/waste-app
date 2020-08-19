import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as xmlParser from 'fast-xml-parser';
import * as fs from 'fs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private parsedFile;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  loadXmlFile() {
    const options = {
      attributeNamePrefix: "@_",
      attrNodeName: "attr", //default is 'false'
      textNodeName: "#text",
      ignoreAttributes: true,
      ignoreNameSpace: false,
      allowBooleanAttributes: false,
      parseNodeValue: true,
      parseAttributeValue: false,
      trimValues: true,
      cdataTagName: "__cdata", //default is 'false'
      cdataPositionChar: "\\c",
      parseTrueNumberOnly: false,
      arrayMode: false, //"strict"
      stopNodes: ["parse-me-as-string"]
    };
    const parser = new DOMParser();
    const serializer = new XMLSerializer();
    const path = 'C:/inetpub/wwwroot/tcpdevlocal/Website/'
    const file = fs.readFileSync(path + 'Web.config', 'utf8');
    const xmlDoc = parser.parseFromString(file, 'text/xml');

    const loginElement = Object.values(xmlDoc.getElementsByTagName('add')).filter(e => e.getAttribute('key') === 'DevelopmentUserLogin')[0];

    loginElement.setAttribute('value', 'CopperA0055@yopmail.com');

    const webconfig = serializer.serializeToString(xmlDoc);

    fs.writeFileSync(path + 'Web.config.test', webconfig);

    return Object.values(xmlDoc.getElementsByTagName('add')).filter(e => e.getAttribute('key') === 'DevelopmentUserLogin')[0].getAttribute('value') + webconfig;
  }

  writeXmlFile(): void {

  }
}
