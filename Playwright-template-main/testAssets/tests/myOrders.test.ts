import { expect, test } from "../pages/customFixture";

test.describe("My Orders related basic flows", async () => {


  test("TC026 Verify users are able to view the ordered products in my orders page", async ({ page, homePage, shopPage, cartPage, paymentsPage, loginPage, profilePage }) => {
    await test.step('Verify user is able to launch the application and reach Home page', async () => {
      await homePage.launchWebApp();
      await expect(page, 'Page title should be ').toHaveTitle('PlayGround');
    })

    await test.step('Verify user is able to login to the application', async () => {
      await loginPage.ecommerceLogin();
    })

    await test.step('Verify user is able to navigate to Shop page', async () => {
      await homePage.openShopPage();
    })

    await test.step('Verify user is able to view details of first product', async () => {
      await shopPage.navigateToDetailsPageOfFirstProduct();
    })

    await test.step('Verify user is able to add the product to the cart and proceed to buy', async () => {
      await shopPage.addProductToCart();
      await shopPage.proccedToCartPage();
    })

    await test.step('Verify user is able to check out the product', async () => {
      await cartPage.proccedToCheckout();
    })

    await test.step('Verify user is able to fill the details and buy the product', async () => {
      const success = await paymentsPage.placeOrder();
      expect(success, "Success message should be visible after order placement").toBe(true);
    })

    await test.step('Navigate to my orders page and verify ordered products are listed in my orders page', async () => {
      await profilePage.navigateToMyOrdersPage();
    })

    await test.step('Verify all order details elements are visible', async () => {
      const allVisible = await profilePage.areOrderDetailsVisible();
      expect(allVisible, 'All order details elements should be visible').toBe(true);
    })

  })


})

