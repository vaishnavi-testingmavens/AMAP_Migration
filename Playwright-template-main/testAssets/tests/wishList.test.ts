import { expect, test } from "../pages/customFixture";

test.describe("Wish List related basic flows", async () => {


  test("TC019 Verify if the user is able to add the product to the wishlist", async ({ page, homePage, shopPage, cartPage, paymentsPage, loginPage, wishListPage }) => {
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

    await test.step('Verify user is able to filter products by Category in Shop page', async () => {
      const totalCountBefore = Number(await shopPage.getTotalProductsCount());
      await shopPage.filterByCategory('Shop by Category', 'Mobiles');
      const totalCountAfter = Number(await shopPage.getTotalProductsCount());
      expect(totalCountAfter).toBeLessThan(totalCountBefore);
    })

    await test.step('Verify user is able to view details of first product', async () => {
      await shopPage.navigateToDetailsPageOfFirstProduct();
    })

    await test.step('Verify user is able to add the product to the wish list and verify the successful toast message', async () => {
      const success = await shopPage.addProductToWishList();
      expect(success, "Success message should be visible after adding the product to wish list").toBe(true);
    })


  })

  test("TC020 Verify if the user is able to add the product to the cart which is in wishlist", async ({ page, homePage, shopPage, cartPage, paymentsPage, loginPage, wishListPage }) => {
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

    await test.step('Verify user is able to filter products by Category in Shop page', async () => {
      const totalCountBefore = Number(await shopPage.getTotalProductsCount());
      await shopPage.filterByCategory('Shop by Category', 'Mobiles');
      const totalCountAfter = Number(await shopPage.getTotalProductsCount());
      expect(totalCountAfter).toBeLessThan(totalCountBefore);
    })

    await test.step('Verify user is able to view details of first product', async () => {
      await shopPage.navigateToDetailsPageOfFirstProduct();
    })

    await test.step('Verify user is able to add the product to the wish list and verify the successful toast message', async () => {
      const success = await shopPage.addProductToWishList();
      expect(success, "Success message should be visible after adding the product to wish list").toBe(true);
    })

    await test.step('Verify if the user is able to add the product to the cart which is in wishlist', async () => {
      await wishListPage.clickWishListIcon();
      await shopPage.addProductToCart();
    })

    await test.step("Verify if the cart count is more than 0", async () => {
      const cartCount = await cartPage.getCartCount();
        expect(cartCount, 'Cart count should be ').toBeGreaterThan(0);
    })


  })

  test("TC021 Verify if the user can reset the wishlist", async ({ page, homePage, shopPage, cartPage, paymentsPage, loginPage, wishListPage }) => {
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

    await test.step('Verify user is able to filter products by Category in Shop page', async () => {
      const totalCountBefore = Number(await shopPage.getTotalProductsCount());
      await shopPage.filterByCategory('Shop by Category', 'Mobiles');
      const totalCountAfter = Number(await shopPage.getTotalProductsCount());
      expect(totalCountAfter).toBeLessThan(totalCountBefore);
    })

    await test.step('Verify user is able to view details of first product', async () => {
      await shopPage.navigateToDetailsPageOfFirstProduct();
    })

    await test.step('Verify user is able to add the product to the wish list and verify the successful toast message', async () => {
      const success = await shopPage.addProductToWishList();
      expect(success, "Success message should be visible after adding the product to wish list").toBe(true);
    })

    await test.step('Verify if the user is able to reset the wishlist', async () => {
      await wishListPage.clickWishListIcon();
      await wishListPage.clickResetWishList();
    })

    await test.step("Verify if the wish list count is 0", async () => {
      const wishListCount = await wishListPage.getWishListCount();
      expect(wishListCount, 'Wish list count should be ').toBe(0);
    })


  })


})

