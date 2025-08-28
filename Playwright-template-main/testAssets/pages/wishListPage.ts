import { Locator, Page, expect, test } from "@playwright/test";
import Actions from "../../helper/actions";
import HomePage from "./homePage";
import * as env from "../test-data/env-waits.json";

export default class WishListPage extends HomePage {
  public actions: Actions;

  wishListIcon: Locator;
  wishListHeading: Locator;
  wishListCount: Locator;
  resetWishListButton: Locator;

  constructor(public page: Page) {
    super(page);
    this.page = page;
    this.actions = new Actions(this.page);

    this.wishListIcon = this.page.locator("//a[@href='/wishlist']");
    this.wishListHeading = this.page.getByRole("heading", {
      name: "Wishlist",
      exact: true,
    });
    this.wishListCount = this.page.locator("//a[@href='/wishlist']//span");
    this.resetWishListButton = this.page.locator(
      "//button[text()='Reset Wishlist']"
    );
  }

  async clickWishListIcon() {
    await test.step(`Click on wish list icon`, async () => {
      await this.actions.clickOn(this.wishListIcon, "Wish list icon");
      await expect(
        this.wishListHeading,
        "Wishlist Heading should be "
      ).toBeVisible();
    });
  }

  async clickResetWishList() {
    await test.step(`Click on reset wish list button`, async () => {
      await this.actions.clickButton(
        this.resetWishListButton,
        "Reset wish list button"
      );
      await this.actions.waitForPageToLoad();
      await this.page.waitForTimeout(env.waitFor.LOW);
      await expect(
        this.wishListHeading,
        "Wishlist Heading should be "
      ).toBeVisible();
    });
  }

  async getWishListCount(): Promise<number> {
    await test.step("Get the total number of products in wish list", async () => {});
    await this.actions.waitForElementToBeVisible(this.wishListCount);
    const count = await this.wishListCount.textContent();
    return Number(count);
  }
}
