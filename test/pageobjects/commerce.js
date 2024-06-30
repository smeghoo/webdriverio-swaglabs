import { $ } from "@wdio/globals";
import Page from "./page.js";
/**
 * sub page containing specific selectors and methods for a specific page
 */
class CommerceActions extends Page {
  /**
   * define selectors using getter methods
   */
  get addBackpack() {
    return $("#add-to-cart-sauce-labs-backpack");
  }

  get addBoltShirt() {
    return $("#add-to-cart-sauce-labs-bolt-t-shirt");
  }

  get removeBackpack(){
    return $("#remove-sauce-labs-backpack");
  }

  get removeBoltShirt(){
    return $("#remove-sauce-labs-bolt-t-shirt");
  }

  get cart() {
    return $('[data-test="shopping-cart-link"]');
  }

  get startCheckout() {
    return $("#checkout");
  }

  get firtName() {
    return $("#first-name");
  }

  get lastName() {
    return $("#last-name");
  }

  get postalCode() {
    return $("#postal-code");
  }

  get continueCheckout() {
    return $("#continue");
  }

  get checkoutSummary() {
    return $('[data-test="cart-list"]');
  }

  get summaryInfo() {
    return $('[class="summary_info"]');
  }

  get finsihCheckout(){
    return $('#finish');
  }

  get formError (){
    return $('[data-test="error"]');
  }

  get addBikeLight(){
    return $('#add-to-cart-sauce-labs-bolt-t-shirt');
  }

  get continueShopping(){
    return $('#continue-shopping');
  }
  
  get cancelOrder(){
    return $('#cancel')
  }

  async addToCart() {
    (await this.addBackpack).click();
    (await this.addBoltShirt).click();
    (await this.cart).click();
    await expect(browser).toHaveUrl(`https://www.saucedemo.com/cart.html`);
  }

  async returnToInventory(){
    (await this.continueShopping).click();
  }

  async updateCartItems(){
    (await this.addBikeLight).click();
    (await this.cart).click();
  }

  async cancelCheckout(){
    (await this.cancelOrder).click();
    await expect(browser).toHaveUrl(`https://www.saucedemo.com/inventory.html`);
  }

  async deCart(){
    (await this.removeBackpack).click();
    (await this.removeBoltShirt).click();
    await expect(this.checkoutSummary).not.toHaveText(expect.stringContaining("Sauce Labs Backpack"));
    await expect(this.checkoutSummary).not.toHaveText(expect.stringContaining("Sauce Labs Bike Light"));
  }

  async checkoutForm() {
    (await this.startCheckout).click();
    await expect(browser).toHaveUrl(
      `https://www.saucedemo.com/checkout-step-one.html`
    );
    (await this.firtName).addValue("John");
    (await this.lastName).addValue("Brown");
    (await this.postalCode).addValue("90046");
    (await this.continueCheckout).click();
  }

  async validateSummary() {
    await expect(this.checkoutSummary).toHaveText(expect.stringContaining("Sauce Labs Backpack"));
    //await expect(this.checkoutSummary).toHaveText(expect.stringContaining("Sauce Labs Bike Light"));
    await expect(this.summaryInfo).toHaveText(expect.stringContaining(`Total: $49.66`));
    await expect(browser).toHaveUrl(`https://www.saucedemo.com/checkout-step-two.html`);
  }

  async noPurchaseSummary(){
    await expect(this.summaryInfo).toHaveText(expect.stringContaining("Item total: $0"));
    await expect(this.summaryInfo).toHaveText(expect.stringContaining(`Total: $0.00`));
    await expect(browser).toHaveUrl(`https://www.saucedemo.com/checkout-step-two.html`);
  }

  async completeCheckout(){
    (await this.finsihCheckout).click();
    await expect(browser).toHaveUrl(`https://www.saucedemo.com/checkout-complete.html`);

  }

  async validateUserInfo(){
    //Empty Form
    (await this.startCheckout).click();
    await expect(browser).toHaveUrl(`https://www.saucedemo.com/checkout-step-one.html`);
    (await this.continueCheckout).click();
    await expect(this.formError).toHaveText(expect.stringMatching("Error: First Name is required"));

   await browser.refresh();

    //First Name Only
    (await this.firtName).addValue("John");
    (await this.continueCheckout).click();
    await expect(this.formError).toHaveText(expect.stringMatching("Error: Last Name is required"));

    await browser.refresh();

    //Last Name Only
    (await this.lastName).addValue("Brown");
    (await this.continueCheckout).click();
    await expect(this.formError).toHaveText(expect.stringMatching("Error: First Name is required"));

    await browser.refresh();

    //Postal Code Only
    (await this.postalCode).addValue("90046");
    (await this.continueCheckout).click();
    await expect(this.formError).toHaveText(expect.stringMatching("Error: First Name is required"));

   await browser.refresh();

    //First Name & Last Name Only
    (await this.firtName).addValue("John");
    (await this.lastName).addValue("Brown");
    (await this.continueCheckout).click();
    await expect(this.formError).toHaveText(expect.stringMatching("Error: Postal Code is required"));

    await browser.refresh();

    //Last Name & Postal Code Only
    (await this.lastName).addValue("Brown");
    (await this.postalCode).addValue("90046");
    (await this.continueCheckout).click();
    await expect(this.formError).toHaveText(expect.stringMatching("Error: First Name is required"));

    await browser.refresh();

    //First Name & Postal Code Only
    (await this.firtName).addValue("John");
    (await this.postalCode).addValue("90046");
    (await this.continueCheckout).click();
    await expect(this.formError).toHaveText(expect.stringMatching("Error: Last Name is required"));

    // All Fields
    (await this.lastName).addValue("Brown");
    (await this.continueCheckout).click();
    await expect(browser).toHaveUrl(`https://www.saucedemo.com/checkout-step-two.html`);
  }
}

export default new CommerceActions();
