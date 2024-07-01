import { expect } from "@wdio/globals";
import testdata from "../../test-data/testdata.js";
import AuthActions from "../pageobjects/auth.js";
import Navigate from "../pageobjects/navigate.js";

describe("User Authentication", () => {
  before("Load Page", async () => {
    await AuthActions.open();
  });

  it("should not login with invalid username and valid password", async () => {
    await AuthActions.authError("unknownuser", testdata.password);
    await browser.refresh();
  });

  it("should not login with invalid password and valid username", async () => {
    await AuthActions.authError(testdata.username, "sauce");
    await browser.refresh();
  });

  it("should not login with invalid username and invalid password", async () => {
    await AuthActions.authError("unknownuser", "sauce");
    await browser.refresh();
  });

  it("should not login with no username ", async () => {
    await AuthActions.noUsername(testdata.password);
    await browser.refresh();
  });

  it("should not login with no password ", async () => {
    await AuthActions.noPassword(testdata.username);
    await browser.refresh();
  });

  it("should block access for locked user account", async () => {
    await AuthActions.accountLockedError("locked_out_user", testdata.password);
  });

  it("should login with valid username and password", async () => {
    await AuthActions.login(testdata.username, testdata.password);
    await expect(browser).toHaveUrl(`https://www.saucedemo.com/inventory.html`);
  });

  it("should signout", async () => {
    await Navigate.logout();
  });

  it("should block access to site when signed out", async () => {
    await AuthActions.accessError();
  });
});
