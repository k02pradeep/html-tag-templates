import { TagRegistry } from './tags/tag-registry';
import { camelCase } from 'lodash';

const NodeTypes = {
  ELEMENT_NODE: 1,
  ATTRIBUTE_NODE: 2,
  TEXT_NODE: 3,
  CDATA_SECTION_NODE: 4,
  ENTITY_REFERENCE_NODE: 5,
  ENTITY_NODE: 6,
  PROCESSING_INSTRUCTION_NODE: 7,
  COMMENT_NODE: 8,
  DOCUMENT_NODE: 9,
  DOCUMENT_TYPE_NODE: 10,
  DOCUMENT_FRAGMENT_NODE: 11,
  NOTATION_NODE: 12,
};

export class XML2JSON {
  xml2json(xmlDoc, jsonObj: any[]) {
    if (xmlDoc.nodeType === NodeTypes.DOCUMENT_NODE) {
      for (var i = 0; i < xmlDoc.childNodes.length; i++) {
        this.xml2json(xmlDoc.childNodes[i], jsonObj);
      }
    } else if (xmlDoc.nodeType === NodeTypes.ELEMENT_NODE) {
      const jsObj = {
        name: xmlDoc.tagName,
        attributes: {},
        children: [],
        content: {},
      };
      const attrNames = xmlDoc.getAttributeNames();
      for (var attr = 0; attr < attrNames.length; attr++) {
        jsObj.attributes[attrNames[attr]] = xmlDoc.getAttribute(
          attrNames[attr]
        );
      }
      const tagProcessor = TagRegistry.getTagDetails(xmlDoc.tagName);
      if (tagProcessor && tagProcessor.parseTag) {
        tagProcessor.parseTag(xmlDoc, jsObj, this.xml2json);
        jsonObj.push(jsObj);
      } else {
        for (var i = 0; i < xmlDoc.childNodes.length; i++) {
          this.xml2json(xmlDoc.childNodes[i], jsObj.children);
        }
        jsonObj.push(jsObj);
      }
    }
  }

  parseXml(xmlDoc) {
    if (xmlDoc.nodeType === NodeTypes.ELEMENT_NODE) {
      const jsObj = {
        name: xmlDoc.tagName,
        attributes: {},
        children: [],
        content: {},
      };
      const attrNames = xmlDoc.getAttributeNames();
      for (let attr = 0; attr < attrNames.length; attr++) {
        jsObj.attributes[attrNames[attr]] = xmlDoc.getAttribute(
          attrNames[attr]
        );
      }
      const tagProcessor = TagRegistry.getTagDetails(xmlDoc.tagName);
      if (tagProcessor && tagProcessor.content === 'fixed') {
        let childObj: any;
        xmlDoc.childNodes.forEach((childNode) => {
          childObj = this.parseXml(childNode);
          if (childObj.name) {
            jsObj.content[camelCase(childNode.tagName)] =
              this.parseXml(childNode);
          }
        });
      } else {
        let childObj: any;
        for (let i = 0; i < xmlDoc.childNodes.length; i++) {
          childObj = this.parseXml(xmlDoc.childNodes[i]);
          if (childObj.name) {
            jsObj.children.push(childObj);
          }
        }
      }
      return jsObj;
    } else {
      return {};
    }
  }

  renderHtml(jsonObj) {
    let htmlStrContent = '';

    jsonObj.children.forEach((child) => {
      htmlStrContent += this.json2html(child);
    });
    let htmlContent = {};
    for (let ctx in jsonObj.content) {
      htmlContent[ctx] = this.renderHtml(jsonObj.content[ctx]);
    }

    const tagRenderer = TagRegistry.getTagDetails(jsonObj.name);
    if (tagRenderer) {
      return tagRenderer.renderTag(jsonObj, htmlContent, htmlStrContent);
    } else {
      return TagRegistry.getAnytagDetails().renderTag(
        jsonObj,
        htmlContent,
        htmlStrContent
      );
    }
  }

  json2html(jsonObj) {
    if (jsonObj.length) {
      let htmlStr = '';
      jsonObj.forEach((jsObj) => {
        htmlStr += this.json2html(jsObj);
      });
      return htmlStr;
    } else {
      let htmlStrContent = '';
      if (jsonObj.children.length) {
        htmlStrContent = this.json2html(jsonObj.children);
      }

      const tagRenderer = TagRegistry.getTagDetails(jsonObj.name);
      if (tagRenderer) {
        return tagRenderer.renderTag(jsonObj, htmlStrContent);
      } else {
        return TagRegistry.getAnytagDetails().renderTag(
          jsonObj,
          htmlStrContent
        );
      }
    }
  }
}
