export class DataLabelTag {
  public static tagName = 'data-label';
  public static content = 'none';
  public static renderTag(jsonObj, content) {
    let renderHtml = `<div class="data-label" tag-type="data-label">
        <span class="label">${jsonObj.attributes.label}</span>
        <span class="value">${jsonObj.attributes.value}</span>
      </div>`;
    return renderHtml;
  }
  public static tagSchema = `
    <data-label icon="" label="required" value="required"></data-label>
  `;
}
