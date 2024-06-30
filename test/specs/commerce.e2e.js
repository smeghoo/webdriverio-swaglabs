import testdata from "../../test-data/testdata.js";
import AuthActions from "../pageobjects/auth.js";
import CommerceActions from "../pageobjects/commerce.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe("Commerce Functions", () => {
  before("Load Inventory Page", async () => {
    await AuthActions.open();
    await AuthActions.login(testdata.username, testdata.password);
  });

  it("should Add items to Cart and Checkout", async () => {
    await CommerceActions.addToCart();
    await CommerceActions.checkoutForm();
    await CommerceActions.validateSummary();
    await CommerceActions.completeCheckout();
    await AuthActions.home();
    await delay(1000);
  });

  it("should Remove items to Cart and Checkout", async () => {
    await CommerceActions.addToCart();
    await CommerceActions.deCart();
    await CommerceActions.checkoutForm();
    await CommerceActions.noPurchaseSummary();
    await CommerceActions.completeCheckout();
    await AuthActions.home();
    await delay(1000);
  });

  it("should update cart items and Checkout", async () => {
    await CommerceActions.addToCart();
    await CommerceActions.deCart();
    await CommerceActions.returnToInventory();
    await CommerceActions.updateCartItems();
    await CommerceActions.checkoutForm();
    await CommerceActions.completeCheckout();
    await AuthActions.home();
    await delay(1000);
  });

  it("should cancel order and return", async () => {
    await CommerceActions.addToCart();
    await CommerceActions.checkoutForm();
    await CommerceActions.cancelCheckout();
    await AuthActions.home();
    await delay(1000);
  });

  it("should check valitation for billing information form then checkout", async () => {
    await CommerceActions.addToCart();
    await CommerceActions.validateUserInfo();
    await CommerceActions.validateSummary();
    await CommerceActions.completeCheckout();
    AuthActions.home();
    await delay(1000);
  });
});
