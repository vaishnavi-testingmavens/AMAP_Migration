import * as env from "../test-data/env-waits.json";
import { expect, test } from "../pages/customFixture";

test.describe("End to End flows", async () => {
  test(
    "TC015 Verify a product can be filtered by category and order can be placed for that product",
    { tag: "@endToEnd" },
    async ({ page, homePage, shopPage, cartPage, paymentsPage, loginPage }) => {
      await test.step("Verify user is able to login to the ecommerce application", async () => {
        await homePage.launchWebApp();
        await loginPage.ecommerceLogin();
      });

      await test.step("Verify user is able to navigate to Shop page", async () => {
        await homePage.openShopPage();
      });

      await test.step("Verify user is able to filter products by Category in Shop page", async () => {
        const totalCountBefore = Number(await shopPage.getTotalProductsCount());
        await shopPage.filterByCategory("Shop by Category", "Mobiles");
        const totalCountAfter = Number(await shopPage.getTotalProductsCount());
        expect(totalCountAfter).toBeLessThan(totalCountBefore);
      });

      await test.step("Verify user is able to view details of first product", async () => {
        //await shopPage.hoverOnFirstProductAndVerifyFlexMenu();
        await shopPage.navigateToDetailsPageOfFirstProduct();
      });

      await test.step("Verify user is able to add the product to the cart and proceed to buy", async () => {
        await shopPage.addProductToCart();
        await shopPage.proccedToCartPage();
      });

      await test.step("Verify user is able to check out the product", async () => {
        await cartPage.proccedToCheckout();
      });

      await test.step("Verify user is able to fill the details and buy the product", async () => {
        const success = await paymentsPage.placeOrder();
        expect(
          success,
          "Success message should be visible after order placement"
        ).toBe(true);
        //expect(await paymentsPage.successMessage.isVisible(), "Success message should be visible").toBe(true);
      });
    }
  );
});
