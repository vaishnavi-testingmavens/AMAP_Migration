import { Locator, Page, expect, test } from "@playwright/test";
import Actions from "../../helper/actions";
import HomePage from "./homePage";
import * as env from "../test-data/env-waits.json";

export default class ProfilePage extends HomePage {
  public actions: Actions;

  profileDropdown: Locator;
  myOrdersOption: Locator;
  myOrdersHeading: Locator;
  viewDetails: Locator;

  orderDetails: Locator;
  orderId: Locator;
  orderedName: Locator;
  orderedEmail: Locator;
  orderedAddress: Locator;
  orderedPhoneNumber: Locator;
  orderedProductPicture: Locator;
  orderedTotalPrice: Locator;

  constructor(public page: Page) {
    super(page);
    this.page = page;
    this.actions = new Actions(this.page);

    this.profileDropdown = this.page.locator(
      "//*[name()='svg'][@class='text-black']"
    );
    this.myOrdersOption = this.page.getByText("My Orders");
    this.myOrdersHeading = this.page.getByRole("heading", {
      name: "My Orders",
      exact: true,
    });
    this.viewDetails = this.page.locator("//a[text()='View Details']");

    this.orderDetails = this.page.locator("//h1[text()='Order Details']");
    this.orderId = this.page.locator("//h2[text()='Order ID: ']");
    this.orderedName = this.page.locator("//p[text()='Name: ']");
    this.orderedEmail = this.page.locator("//p[text()='Email: ']");
    this.orderedAddress = this.page.locator("//p[text()='Address: ']");
    this.orderedPhoneNumber = this.page.locator("//p[text()='Phone: ']");
    this.orderedProductPicture = this.page.locator("//div[@class='space-y-6']");
    this.orderedTotalPrice = this.page.locator("//p[text()='Total: $']");
  }

  async clickProfileDropdown() {
    await this.actions.clickDropdown(
      this.profileDropdown.first(),
      "Profile dropdown"
    );
  }

  async clickMyOrdersOption() {
    await this.actions.clickButton(this.myOrdersOption, "My orders option");
    await expect(
      this.myOrdersHeading,
      "My Orders Heading should be "
    ).toBeVisible();
  }

  async clickViewDetails() {
    await this.actions.clickOn(this.viewDetails.first(), "View details option");
    await this.actions.waitForPageToLoad();
  }

  async navigateToMyOrdersPage() {
    await this.clickProfileDropdown();
    await this.clickMyOrdersOption();
    await this.clickViewDetails();
  }

  async areOrderDetailsVisible() {
    await test.step("Check if all order details elements are visible", async () => {});
    const visibilityResults = await Promise.all([
      this.orderDetails.isVisible(),
      this.orderId.isVisible(),
      this.orderedName.isVisible(),
      this.orderedEmail.isVisible(),
      this.orderedAddress.isVisible(),
      this.orderedPhoneNumber.isVisible(),
      this.orderedProductPicture.isVisible(),
      this.orderedTotalPrice.isVisible(),
    ]);
    const elements = [
      "Order Details",
      "Order ID",
      "Ordered Name",
      "Ordered Email",
      "Ordered Address",
      "Ordered Phone Number",
      "Ordered Product Picture",
      "Ordered Total Price",
    ];

    visibilityResults.forEach((result, index) => {
      console.log(`${elements[index]} is visible: ${result}`);
    });
    return visibilityResults.every((result) => result === true);
  }
}
