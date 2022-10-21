import "../testing/mocks";
import "./features";
import { CATEGORIES, getFeatures } from "../core/features";
import { readdirSync } from "fs";

describe("Feature configuration", () => {
  for (const feature of getFeatures()) {
    it(`Feature "${feature.id}" provides valid configuration`, () => {
      expect(feature.id).toBeTruthy();
      expect(feature.name).toBeTruthy();
      expect(feature.description).toBeTruthy();
      expect(CATEGORIES).toContain(feature.category);
    });
  }
});

describe("Feature folders", () => {
  // Folders not changed to "registerFeature".
  const folderExceptions = [
    "agc",
    "akaNameLinks",
    "appsMenu",
    "bioCheck",
    "categoryFinderPins",
    "collapsibleDescendantsTree",
    "darkMode",
    "distanceAndRelationship",
    "draftList",
    "familyGroup",
    "locationsHelper",
    "randomProfile",
    "sourcepreview",
    "spacepreview",
    "wt+",
  ];

  // Folders containing a feature with a different id than the folder name.
  const legacyIds = {
    printerfriendly: "printerFriendly",
  };

  const featureFolders = readdirSync("src/features", { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => !folderExceptions.includes(name));

  const featureIds = getFeatures().map((feature) => feature.id);

  for (const folder of featureFolders) {
    it(`Folder "${folder}" contains a registered feature`, () => {
      const expectedId = legacyIds[folder] || folder;
      expect(featureIds).toContain(expectedId);
    });
  }
});
