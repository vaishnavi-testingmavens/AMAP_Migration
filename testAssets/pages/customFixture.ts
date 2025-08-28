import { test as base } from "@playwright/test";
import ComponentsPage from "./componentsPage";
import HomePage from "./homePage";
import LoginPage from "./loginPage";
import ShopPage from "./shopPage";
import CartPage from "./cartPage";
import WishListPage from "./wishListPage";
import PaymentsPage from "./paymentsPage";
import ProfilePage from "./profilePage";


type CustomFixture = {

    homePage: HomePage;
    loginPage: LoginPage;
    shopPage: ShopPage;
    cartPage: CartPage;
    wishListPage: WishListPage;
    paymentsPage: PaymentsPage;
    profilePage: ProfilePage;
    componentsPage: ComponentsPage;
    testHook: void;
}


export const test = base.extend<CustomFixture, {}>({

    
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    shopPage: async ({ page }, use) => {
        const shopPage = new ShopPage(page);
        await use(shopPage);
    }, 
    componentsPage: async ({ page }, use) => {
        const componentsPage = new ComponentsPage(page);
        await use(componentsPage);
    },
    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },
    wishListPage: async ({ page }, use) => {
        const wishListPage = new WishListPage(page);
        await use(wishListPage);
    },
    profilePage: async ({ page }, use) => {
        const profilePage = new ProfilePage(page);
        await use(profilePage);
    },
    paymentsPage: async ({ page }, use) => {
        const paymentsPage = new PaymentsPage(page);
        await use(paymentsPage);
    },
});

export { expect } from '@playwright/test';
