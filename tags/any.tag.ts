export class AnyTag {
  public static tagName = '';
  public static content = 'any';
  public static renderTag(jsonObj, htmlContent, htmlStr) {
    let attrStr = '';
    for (let attr in jsonObj.attributes) {
      attrStr += attr + "='" + jsonObj.attributes[attr] + "' ";
    }
    return `<${jsonObj.name.toLowerCase()} ${attrStr}>${
      htmlStr ? htmlStr : ''
    }</${jsonObj.name.toLowerCase()}>`;
  }
  public static tagSchema = `<layout><content></content</layout>`;
}
