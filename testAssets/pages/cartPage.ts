import { Locator, Page, expect, test } from "@playwright/test";
import Actions from "../../helper/actions";
import HomePage from "./homePage";
import * as env from "../test-data/env-waits.json";
import * as endpoints from "../test-data/env-endpoints.json";

export default class CartPage extends HomePage {
  public actions: Actions;

  homeMenu: Locator;
  proceedToCheckoutButton: Locator;
  paymentsHeading: Locator;
  cartIcon: Locator;
  cartHeading: Locator;
  plusIcon: Locator;
  minusIcon: Locator;
  quantityField: Locator;
  productRowInCart: Locator;
  resetCartButton: Locator;
  cartCount: Locator;

  constructor(public page: Page) {
    super(page);
    this.page = page;
    this.actions = new Actions(this.page);

    this.homeMenu = this.page.getByRole("link", { name: "Home" });

    this.proceedToCheckoutButton = this.page.getByRole("button", {
      name: "Proceed to Checkout",
    });
    this.paymentsHeading = this.page
      .locator("div")
      .filter({ hasText: /^Payment Gateway paymentgateway$/ })
      .getByRole("heading");
    this.cartIcon = this.page.locator("//a[@href='/cart']");
    this.cartHeading = this.page.getByRole("heading", {
      name: "Cart",
      exact: true,
    });
    this.plusIcon = this.page.locator("//span[text()='+']");
    this.minusIcon = this.page.locator("//span[text()='-']");
    this.quantityField = this.page.locator(
      "//div[contains(@class,'items-center')]/span/following-sibling::p"
    );
    this.productRowInCart = this.page.locator(
      "//div[contains(@class,'w-full grid')]"
    );
    this.resetCartButton = this.page.locator("//button[text()='Reset cart']");
    this.cartCount = this.page.locator("//a[@href='/cart']//span");
  }

  async proccedToCheckout() {
    await test.step(`Click on 'Procced To Checkout' to navigate to the Payment page`, async () => {
      await this.actions.clickButton(
        this.proceedToCheckoutButton,
        "ProceedToCheckout"
      );
      await expect(
        this.paymentsHeading,
        "Payments Heading should be "
      ).toBeVisible();
    });
  }

  async clickCartIcon() {
    await test.step(`Click on cart icon`, async () => {
      await this.actions.clickOn(this.cartIcon.first(), "Cart icon");
      await expect(this.cartHeading, "Cart Heading should be ").toBeVisible();
    });
  }

  async clickPlusIcon(times: number) {
    await test.step(`Click the plus icon ${times} times to increase the quantity of the product`, async () => {
      for (let i = 0; i < times; i++) {
        await this.actions.clickOn(this.plusIcon.first(), "Plus icon");
        // await this.actions.waitForApiResponse(endpoints.networkCalls.itemApi);
        await this.actions.waitForPageToLoad();
      }
    });
  }

  async clickMinusIcon(times: number) {
    await test.step(`Click the minus icon ${times} times to reduce the quantity of the product`, async () => {
      for (let i = 0; i < times; i++) {
        await this.actions.clickOn(this.minusIcon.first(), "Minus icon");
        // await this.actions.waitForApiResponse(endpoints.networkCalls.itemApi);
        await this.actions.waitForPageToLoad();
      }
    });
  }

  async getProductQuantity(): Promise<number> {
    await test.step("Get the total quantity of products", async () => {});
    await this.actions.waitForElementToBeVisible(this.quantityField.first());
    const quantityText = await this.quantityField.first().textContent();
    return Number(quantityText);
  }

  async validateProductCountInCart(expectedCount: number): Promise<boolean> {
    await test.step(`Validate that the cart contains at least ${expectedCount} products`, async () => {});
    const productCount = await this.productRowInCart.count();
    console.log(`Number of products in cart: ${productCount}`);
    return productCount >= expectedCount;
  }

  async clickResetCart() {
    await test.step(`Click on reset cart button`, async () => {
      await this.actions.clickButton(this.resetCartButton, "Reset cart button");
      await this.actions.waitForPageToLoad();
      await this.page.waitForTimeout(env.waitFor.LOW);
      await expect(this.cartHeading, "Cart Heading should be ").toBeVisible();
    });
  }

  async getCartCount(): Promise<number> {
    await test.step("Get the total number of products in cart", async () => {});
    await this.actions.waitForElementToBeVisible(this.cartCount);
    const count = await this.cartCount.textContent();
    return Number(count);
  }
}
