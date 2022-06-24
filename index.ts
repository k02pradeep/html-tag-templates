// Import stylesheets
import './style.css';
import { XML2JSON } from './xml2json';
import { TagRegistry } from './tags/tag-registry';
import { DataLabelTag } from './tags/data-label.tag';
import { LayoutTag } from './tags/layout.tag';
import { ApplicationTag } from './tags/application.tag';
import { AnyTag } from './tags/any.tag';

TagRegistry.registerTag(DataLabelTag);
TagRegistry.registerTag(LayoutTag);
TagRegistry.registerTag(ApplicationTag);
TagRegistry.registerTag(AnyTag);

// Write TypeScript code!

var parser, xmlDoc;
var text = `
  <layout>
    <data-label label="Hello" value="World" icon="none"></data-label>
    <data-label label="Hello1" value="World1" icon="none1"></data-label>
  </layout>`;

parser = new DOMParser();
xmlDoc = parser.parseFromString(text, 'text/xml');
console.log(xmlDoc);
window.doc = xmlDoc;
const jsonObj = [];
const xmlParser = new XML2JSON();

const templateStr = document.getElementById('test');
const jsonObj2 = xmlParser.parseXml(templateStr.content.childNodes[1]);
console.log(jsonObj2);
const htmlStr = xmlParser.renderHtml(jsonObj2);
console.log(htmlStr);

document.body.innerHTML = htmlStr;

const appDiv: HTMLElement = document.getElementById('app');

const jsonObj3 = xmlParser.parseXml(xmlDoc.childNodes[0]);
console.log(jsonObj3);
const htmlStr3 = xmlParser.renderHtml(jsonObj3);
console.log(htmlStr3);

appDiv.innerHTML = htmlStr3;
console.log(appDiv.innerHTML);
