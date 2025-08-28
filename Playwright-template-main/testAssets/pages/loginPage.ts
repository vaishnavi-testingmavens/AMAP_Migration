import { Locator, Page, test } from "@playwright/test";
import Actions from "../../helper/actions";
import * as env from "../test-data/env-waits.json";

export default class LoginPage {
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly signInButton: Locator;
  readonly loginOption: Locator;
  readonly emailAddressField: Locator;
  readonly ecommercePasswordField: Locator;
  readonly loginButton: Locator;
  readonly loginSuccessToast: Locator;
  actions: Actions;

  profileDropdown: Locator;

  constructor(public page: Page) {
    this.actions = new Actions(this.page);
    this.emailField = this.page.getByPlaceholder("Username");
    this.passwordField = this.page.getByPlaceholder("Password");
    this.signInButton = this.page.getByText("Sign In");

    this.loginOption = this.page.getByText("Login");
    this.emailAddressField = this.page.locator("//input[@name='email']");
    this.ecommercePasswordField = this.page.locator(
      "//input[@name='password']"
    );
    this.loginButton = this.page.locator("//button[text()='Login']");
    this.profileDropdown = this.page.locator(
      "//*[name()='svg'][@class='text-black']"
    );
    this.loginSuccessToast = this.page.locator(
      "//div[@data-in='true']//div[text()='Login Successful.']"
    );
  }

  async enterUserName(userName: string) {
    await test.step("Enter user name", async () => {
      await this.actions.waitForPageToLoad();
      await this.actions.typeText(this.emailField, userName, "User name field");
    });
  }

  async enterPassword(password: string) {
    await test.step("Enter password", async () => {
      await this.actions.typeText(
        this.passwordField,
        password,
        "Password field"
      );
    });
  }

  async clickSignInButton() {
    await test.step("Click on sign in button", async () => {
      await this.actions.clickButton(this.signInButton, "Sign In button");
    });
  }

  async clickLoginOption() {
    await test.step("Click on login button", async () => {
      await this.actions.clickButton(this.loginOption, "Login option");
    });
  }

  async enterEmailAddress(emailAddress: string) {
    await test.step("Enter email address", async () => {
      await this.actions.waitForPageToLoad();
      await this.actions.typeText(
        this.emailAddressField,
        emailAddress,
        "Email address field"
      );
    });
  }

  async enterEcommercePassword(password: string) {
    await test.step("Enter password", async () => {
      await this.actions.typeText(
        this.ecommercePasswordField,
        password,
        "Password field"
      );
    });
  }

  async clickLoginButton() {
    await test.step("Click on login button", async () => {
      await this.actions.clickButton(this.loginButton, "Login button");
    });
  }

  async clickProfileDropdown() {
    await test.step("Click on profile dropdown", async () => {
      await this.actions.clickDropdown(
        this.profileDropdown.first(),
        "Profile dropdown"
      );
    });
  }

  async loginOnly(userName: string, password: string) {
    await test.step("Login to the play ground application", async () => {
      await this.enterUserName(userName);
      await this.enterPassword(password);
      await this.clickSignInButton();
      console.log("Logged in successfully");
      await this.actions.waitForElementToBeDisappear(this.loginSuccessToast);
    });
  }

  async launchBrowserAndloginToApp(url, userName, password) {
    await test.step("Launch browser and login to the app", async () => {
      await this.page.goto(`${url}/login`);
      await this.loginOnly(userName, password);
    });
  }

  async ecommerceLogin(
    emailAddress = process.env.emailAddress!,
    password = process.env.ecommercePassword!
  ) {
    await test.step("Login to e-commerce", async () => {
      await this.clickProfileDropdown();
      await this.clickLoginOption();
      await this.enterEmailAddress(emailAddress);
      await this.enterEcommercePassword(password);
      await this.clickLoginButton();
      await this.actions.waitForPageToLoad();
      await this.page.waitForTimeout(env.waitFor.LOW);
    });
  }
}
