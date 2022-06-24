export class TagRegistry {
  private static tagRegistry = {};

  public static registerTag(tagDetails) {
    TagRegistry.tagRegistry[tagDetails.tagName] = tagDetails;
  }

  public static getTagDetails(tagName) {
    return TagRegistry.tagRegistry[tagName.toLowerCase()];
  }

  public static getAnytagDetails() {
    return TagRegistry.tagRegistry[''];
  }
}
