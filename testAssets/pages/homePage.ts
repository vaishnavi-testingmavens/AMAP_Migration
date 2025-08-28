import { Locator, Page, expect, test } from "@playwright/test";
import Actions from "../../helper/actions";
import { env } from "process";

export default class HomePage {
    public actions: Actions

    homeMenu: Locator;
    shopMenu: Locator;
    componentsMenu: Locator;
    productsTitle: Locator;

    constructor(public page: Page) {
        this.page = page;
        this.actions = new Actions(this.page);

        this.shopMenu = this.page.getByRole('link', { name: 'Shop', exact: true });
        this.componentsMenu = this.page.getByRole('link', { name: 'Components' });
        this.homeMenu = this.page.getByRole('link', { name: 'Home' })
        this.productsTitle = this.page.getByRole('heading', { name: 'Products' })

    }



    async launchWebApp() {
        await test.step(`Launch app by navigating to the url ${process.env.base_Url}`, async () => {
            await this.page.goto(`${process.env.base_Url}`);
        })
    }

    async openShopPage() {
        await test.step("Opening Shop page", async () => {
            await this.actions.clickOn(this.shopMenu, "Shop menu");
            await this.actions.waitForPageToLoad();
            await expect(this.productsTitle, "Shope page with Products title should be ").toBeVisible();
        })
    }

    async openComponentsPage() {
        await test.step("Opening Components page", async () => {
            await this.actions.clickOn(this.componentsMenu, "Components menu");
        })
    }


}