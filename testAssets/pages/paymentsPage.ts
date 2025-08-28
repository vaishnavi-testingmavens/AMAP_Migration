import { Locator, Page, expect, test } from "@playwright/test";
import Actions from "../../helper/actions";
import HomePage from "./homePage";

export default class PaymentsPage extends HomePage {
    public actions: Actions

    homeMenu: Locator;
    placeOrderButton: Locator;
    fullNameField: Locator;
    emailField: Locator;
    phoneField: Locator;
    addressField: Locator;
    successMessage: Locator;


    constructor(public page: Page) {
        super(page);
        this.page = page;
        this.actions = new Actions(this.page);

        // this.shopMenu = this.page.getByRole('link', { name: 'Shop' });
        // this.componentsMenu = this.page.getByRole('link', { name: 'Components' });
        this.homeMenu = this.page.getByRole('link', { name: 'Home' });

        this.placeOrderButton = this.page.getByRole('button', { name: 'Place Order' });
        this.fullNameField = this.page.locator('div').filter({ hasText: /^Full Name$/ }).getByRole('textbox');
        this.emailField = this.page.locator('input[type="email"]')
        this.addressField = this.page.locator('textarea');
        this.phoneField = this.page.locator('div').filter({ hasText: /^Phone$/ }).getByRole('textbox')
        this.successMessage = this.page.locator("//span[text()='Your order has been placed successfully!']")
    }

    async placeOrder() {
        //let success;
        await test.step(`Fill the required details and place order`, async () => { })
        await this.fullNameField.fill("Arun");
        await this.emailField.fill("arun@example.com");
        await this.phoneField.fill("9876543210");
        await this.addressField.fill("123 New York");
        await this.placeOrderButton.click();
        await this.actions.waitForElementToBeVisible(this.successMessage);
        //success = await this.successMessage.isVisible();
        return this.successMessage.isVisible();

        //return success;
    }


}