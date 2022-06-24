import { camelCase } from 'lodash';

export class ApplicationTag {
  public static tagName = 'application';
  public static content = 'fixed';
  public static renderTag(jsonObj, htmlContent, htmlStr) {
    return `
    <div class="application app-container h-screen flex flex-column relative" tag-type="application">
      <div class="app-header-container app-header">${htmlContent.appHeader}</div>
      <div class="app-main-container overflow-hidden flex-grow-1 flex flex-row">
        <div class="app-side-bar-container app-nav-left">${htmlContent.appSideBar}</div>
        <div class="app-body flex flex-column flex-auto">
          <div class="app-content flex flex-column overflow-hidden flex-grow-1">
            <div class="app-content-header" id='app'></div>
            ${htmlContent.appContent}
          </div>
          <div class="app-footer">${htmlContent.appFooter}</div>
        </div>
      <div class="app-nav-right">ANR</div>
    </div>`;
  }

  public static tagSchema = `
  <application>
    <children multiple="false" sequence="true">
      <app-header></app-header>
      <app-side-bar multiple="true"></app-side-bar>
      <app-content></app-content>
      <app-footer></app-footer>
    </children>
  </application>`;
}
