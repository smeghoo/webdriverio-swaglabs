import { expect } from "@wdio/globals";
import testdata from "../../test-data/testdata.js";
import AuthActions from "../pageobjects/auth.js";
import Navigate from "../pageobjects/navigate.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe("Commerce Functions", () => {
  before("Load Inventory Page", async () => {
    await AuthActions.open();
    await AuthActions.login(testdata.username, testdata.password);
  });

  it("should verify 'Add To Cart' for all Inventory Items", async () => {
    await Navigate.addToCartCheck();
  });

  it("should sort items in Alphabetical Order", async () => {
    await Navigate.inventoryItemsAZ();
    await Navigate.inventoryItemsZA();
  });

  it("should sort items based on Price", async () => {
    await Navigate.inventoryItemsHigh();
    await Navigate.inventoryItemsLow();
  });

  it("should navigate to Item Page by Image", async () => {
    await delay(2000);
    await Navigate.viewItemByImage();
  });

  it("should navigate to Item Page by Link", async () => {
    await Navigate.viewItemsByLink();
  });

  it("should Navigate to About Page", async () => {
    await Navigate.aboutRedirect();
  });

  it("should Reset App State", async () => {
    await Navigate.resetAppState();
  });

  it("should navigate through footer socials", async () => {
    await Navigate.footerNavigation();
  });
});
