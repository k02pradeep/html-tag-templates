export class LayoutTag {
  public static tagName = 'layout';
  public static content = 'any';
  public static renderTag(jsonObj, htmlContent, htmlStr) {
    return `<div class="layout" tag-type="layout">${htmlStr}</div>`;
  }
  public static tagSchema = `<layout><content></content></layout>`;
}
