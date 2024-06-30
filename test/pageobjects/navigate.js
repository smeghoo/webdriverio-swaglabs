import { $ } from "@wdio/globals";
import Page from "./page.js";
import AuthActions from '../pageobjects/auth.js'
/**
 * sub page containing specific selectors and methods for a specific page
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class Navigate extends Page {
  /**
   * define selectors using getter methods
   */
 get navMenu(){
  return $('#react-burger-menu-btn');
 }

 get menuItems(){
  return $('[class="bm-menu-wrap"]');
 }

 get allItems(){
  return $('#inventory_sidebar_link');
 }

 get aboutPage(){
  return $('[data-test="about-sidebar-link"]');
 }

 get signOut(){
  return $('#logout_sidebar_link');
 }

 get resetApp(){
  return $('#reset_sidebar_link');
 }

 get addBackpack() {
  return $("#add-to-cart-sauce-labs-backpack");
}

get cart(){
  return $('[data-test="shopping-cart-badge"]');
}

get backpackItem(){
  return $('[data-test="inventory-item-sauce-labs-backpack-img"]');
}

get backpackItemLink(){
  return $('div=Sauce Labs Backpack');
}

get itemName(){
  return $('[data-test="inventory-item-name"]')
}

get itemDescription(){
  return $('[data-test="inventory-item-desc"]')
}

get itemPrice(){
  return $('[data-test="inventory-item-price"]')
}

get itemAddtoCart(){
  return $('[data-test="add-to-cart"]');
}

get returnToInventory(){
  return $('#back-to-products');
}

get inventoryItemsListing(){
  return $('[data-test="inventory-list"]');
}

get sortItems(){
  return $('[data-test="product-sort-container"]');
}

get twitterFooter(){
  return $('[data-test="social-twitter"]');
}

get facebookFooter(){
  return $('[data-test="social-facebook"]');
}

get linkedinFooter(){
  return $('[data-test="social-linkedin"]');
}

async addToCartCheck(){
  const priceBar = await $$('[class="pricebar"]');
  const count = priceBar.length; //20

  for(let x = 0; x < count; x++){
  await expect(priceBar[x]).toHaveText(expect.stringContaining('Add to cart'));
  }
}

async footerNavigation(){
var handlesBeforeClick, handlesAfterClick, newWindowHandle;
  //twitter

   // Get all window handles before clicking the link
    handlesBeforeClick = await browser.getWindowHandles();

   // Click the Twitter link
   (await this.twitterFooter).click();
 
   // Wait for a new window to appear (adjust timeout as needed)
   await browser.waitUntil(async () => {
      handlesAfterClick = await browser.getWindowHandles();
     return handlesAfterClick.length > handlesBeforeClick.length;
   }, { timeout: 5000 }); // Set a timeout to prevent infinite waiting
 
   // Now you can safely get the new window handle
    newWindowHandle = (await browser.getWindowHandles())[1];
 
   // Switch to the new window
   await browser.switchToWindow(newWindowHandle);
 
   // Wait for the new window to load (adjust timeout as needed)
   await browser.waitUntil(async () => {
     return await browser.getUrl() === 'https://x.com/saucelabs';
   }, { timeout: 5000 });
 
   // Your actions in the new window
   await browser.closeWindow();
   await browser.switchToWindow(handlesBeforeClick[0]);
   await delay(1000);
  
  //facebook
     handlesBeforeClick = await browser.getWindowHandles();

    (await this.facebookFooter).click();

    await browser.waitUntil(async () => {
       handlesAfterClick = await browser.getWindowHandles();
      return handlesAfterClick.length > handlesBeforeClick.length;
    }, { timeout: 5000 }); 

     newWindowHandle = (await browser.getWindowHandles())[1];

    await browser.switchToWindow(newWindowHandle);
  
    await browser.waitUntil(async () => {
      return await browser.getUrl() === 'https://www.facebook.com/saucelabs';
    }, { timeout: 5000 });
  
    await browser.closeWindow();
    await browser.switchToWindow(handlesBeforeClick[0]);
    await delay(1000);

   //linkedin
  handlesBeforeClick = await browser.getWindowHandles();

    (await this.linkedinFooter).click();

    await browser.waitUntil(async () => {
       handlesAfterClick = await browser.getWindowHandles();
      return handlesAfterClick.length > handlesBeforeClick.length;
    }, { timeout: 5000 }); 

     newWindowHandle = (await browser.getWindowHandles())[1];

    await browser.switchToWindow(newWindowHandle);
    await expect(browser).toHaveUrl(expect.stringContaining('linkedin'));
 
  
    await browser.closeWindow();
    await browser.switchToWindow(handlesBeforeClick[0]);
    await delay(1000);
}

async viewItemByImage(){
  (await this.backpackItem).click();
  await expect(browser).toHaveUrl(`https://www.saucedemo.com/inventory-item.html?id=4`);
  await expect(this.itemName).toHaveText(expect.stringMatching('Sauce Labs Backpack'));
  await expect(this.itemDescription).toHaveText(expect.stringContaining('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.'));
  await expect(this.itemPrice).toHaveText(expect.stringContaining('$29.99'));
  await expect(this.itemAddtoCart).toBeExisting();
  await expect(this.itemAddtoCart).toHaveText(expect.stringMatching("Add to cart"));
  (await this.returnToInventory).click();
}

async viewItemsByLink(){
  (await this.backpackItemLink).click();
  await expect(browser).toHaveUrl(`https://www.saucedemo.com/inventory-item.html?id=4`);
  (await this.returnToInventory).click();
  await expect(browser).toHaveUrl(`https://www.saucedemo.com/inventory.html`);

}

 async aboutRedirect(){
  (await this.navMenu).click();
  await delay(2000);
  (await this.aboutPage).click();
  await expect(browser).toHaveUrl(`https://saucelabs.com/`);
  await browser.url(`https://www.saucedemo.com/inventory.html`);
  await delay(2000);
 }

 async resetAppState(){
  (await this.navMenu).click();
  (await this.addBackpack).click();
  await expect(this.cart).toHaveText('1');
  (await this.resetApp).click();
  await expect(this.cart).not.toBeExisting()
  await delay(1000);
 }

 async logout(){
  await this.navMenu.click();
  await delay(2000);
  (await this.signOut).click();
  await expect(browser).toHaveUrl(`https://www.saucedemo.com/`);
 }

 async inventoryItemsAZ(){
  const sort = await (this.sortItems);
  await sort.selectByAttribute('value', 'az');

  //declaring and initializing variables & selectors
  const inventoryItems = await $$('[data-test="inventory-list"]');
  const count = inventoryItems.length;
  const firstItem = inventoryItems[0];
  const lastItem = inventoryItems[count - 1];

 //assertions
  await expect(firstItem).toHaveText(expect.stringContaining('Sauce Labs Backpack'));
  await expect(lastItem).toHaveText(expect.stringContaining('T-Shirt (Red)'));
  await delay(2000);
 }

 async inventoryItemsZA(){
  const sort = await (this.sortItems);
  await sort.selectByAttribute('value', 'za');

  //declaring and initializing variables & selectors
  const inventoryItems = await $$('[data-test="inventory-list"]');
  const count = inventoryItems.length;
  const firstItem = inventoryItems[0];
  const lastItem = inventoryItems[count - 1];

  await expect(firstItem).toHaveText(expect.stringContaining('T-Shirt (Red)'));
  await expect(lastItem).toHaveText(expect.stringContaining('Sauce Labs Backpack'));
  await delay(2000);
 }

 async inventoryItemsLow(){
  const sort = await (this.sortItems);
  await sort.selectByAttribute('value', 'lohi');

  //declaring and initializing variables & selectors
  const inventoryItems = await $$('[data-test="inventory-list"]');
  const count = inventoryItems.length;
  const firstItem = inventoryItems[0];
  const lastItem = inventoryItems[count - 1];

  await expect(firstItem).toHaveText(expect.stringContaining('Sauce Labs Onesie'));
  await expect(firstItem).toHaveText(expect.stringContaining('$7.99'));
  await expect(lastItem).toHaveText(expect.stringContaining('Sauce Labs Fleece Jacket'));
  await expect(lastItem).toHaveText(expect.stringContaining('$49.99'));
  await delay(2000);
 }

 async inventoryItemsHigh(){
  const sort = await (this.sortItems);
  await sort.selectByAttribute('value', 'hilo');

  //declaring and initializing variables & selectors
  const inventoryItems = await $$('[data-test="inventory-list"]');
  const count = inventoryItems.length;
  const firstItem = inventoryItems[0];
  const lastItem = inventoryItems[count - 1];

  await expect(firstItem).toHaveText(expect.stringContaining('Sauce Labs Fleece Jacket'));
  await expect(firstItem).toHaveText(expect.stringContaining('$49.99'));
  await expect(lastItem).toHaveText(expect.stringContaining('Sauce Labs Onesie'));
  await expect(lastItem).toHaveText(expect.stringContaining('$7.99'));
  await delay(2000);
 }
}

export default new Navigate();
