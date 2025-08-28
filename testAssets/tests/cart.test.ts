import { expect, test, } from "../pages/customFixture";

test.use({ launchOptions: { args: ['--deny-permission-prompts'] } });

test.describe("Cart related basic flows", async () => {


  test("TC008 Verify if the user can add multiple quantity of the same product to the cart", async ({ page, homePage, shopPage, cartPage, paymentsPage, loginPage, wishListPage }) => {
    await test.step('Verify user is able to launch the application and reach Home page', async () => {
      await homePage.launchWebApp();
      // await expect(page, 'Page title should be ').toHaveTitle('Croma Electronics | Online Electronics Shopping | Buy Electronics Online');
      await expect(page, 'Page title should be ').toHaveTitle('Insurance - Compare & Buy Insurance Plans – Health, Term, Life, Car, Bike, Investment');
      // await page.waitForTimeout(5000)
    })

    await test.step('Verify user is able to login to the application', async () => {
      // await loginPage.ecommerceLogin();
      // await page.locator("//a[@data-testid='image-carousal-adobe' and contains(@href,'televisions-accessories')]").click();
      await page.locator("//p[contains(text(),'Travel')]").click();
      await page.waitForTimeout(5000)
    })

    await test.step('Verify user is able to navigate to Shop page', async () => {
      await homePage.openShopPage();
    })  

    await test.step('Verify user is able to filter products by Category in Shop page', async () => {
      const totalCountBefore = Number(await shopPage.getTotalProductsCount());
      await shopPage.filterByCategory('Shop by Category', 'Headsets');
      const totalCountAfter = Number(await shopPage.getTotalProductsCount());
      expect(totalCountAfter).toBeLessThan(totalCountBefore);
    })

    await test.step('Verify user is able to view details of first product', async () => {
      await shopPage.navigateToDetailsPageOfFirstProduct();
    })

    await test.step('Verify user is able to add multiple quantity of the same product', async () => {
      await shopPage.addProductToCart();
      await cartPage.clickCartIcon();
    })

    await test.step('Verify user is able to add multiple quantity of the same product', async () => {
      const initialQuantity = await cartPage.getProductQuantity();
      const additionalQuantity = 3; // Number of times to click the plus icon
      await cartPage.clickPlusIcon(additionalQuantity);
      const finalQuantity = await cartPage.getProductQuantity();
      expect(finalQuantity, 'Final quantity should be initial quantity + additional quantity').toBe(initialQuantity + additionalQuantity);
    });


  })

  test("TC009 Verify if the user can reduce quantity of the same product from the cart", async ({ page, homePage, shopPage, cartPage, paymentsPage, loginPage, wishListPage }) => {
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
      await shopPage.filterByCategory('Shop by Category', 'Headsets');
      const totalCountAfter = Number(await shopPage.getTotalProductsCount());
      expect(totalCountAfter).toBeLessThan(totalCountBefore);
    })

    await test.step('Verify user is able to view details of first product', async () => {
      await shopPage.navigateToDetailsPageOfFirstProduct();
    })

    await test.step('Verify user is able to add multiple quantity of the same product', async () => {
      await shopPage.addProductToCart();
      await cartPage.clickCartIcon();
    })

    await test.step('Verify user is able to add multiple quantity of the same product', async () => {
      const initialQuantity = await cartPage.getProductQuantity();
      const additionalQuantity = 3; // Number of times to click the plus icon
      await cartPage.clickPlusIcon(additionalQuantity);
      const finalQuantity = await cartPage.getProductQuantity();
      expect(finalQuantity, 'Final quantity should be initial quantity + additional quantity').toBe(initialQuantity + additionalQuantity);
    })

    await test.step('Verify user is able to reduce the quantity of the same product', async () => {
      const initialQuantity = await cartPage.getProductQuantity();
      const reduceQuantity = 2; // Number of times to click the minus icon
      await cartPage.clickMinusIcon(reduceQuantity);
      const finalQuantity = await cartPage.getProductQuantity();
      expect(finalQuantity, 'Final quantity should be initial quantity - reduced quantity').toBe(initialQuantity - reduceQuantity);
    })


  })

  test("TC010 Verify if the user can add multiple product to the cart", async ({ page, homePage, shopPage, cartPage, paymentsPage, loginPage, wishListPage }) => {
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
      await shopPage.filterByCategory('Shop by Category', 'Headsets');
      const totalCountAfter = Number(await shopPage.getTotalProductsCount());
      expect(totalCountAfter).toBeLessThan(totalCountBefore);
    })

    await test.step('Verify user is able to add different category products to the cart', async () => {
      await shopPage.addProductToCart();
      await shopPage.addAnotherProductToCart('Mobiles');
      await cartPage.clickCartIcon();
    })

    await test.step('Verify that the cart contains at least 2 products', async () => {
      const isProductCountValid = await cartPage.validateProductCountInCart(2);
      expect(isProductCountValid, 'The cart should contain at least 2 products').toBe(true);
    })



  })

  test("TC011 Verify if the user can reset the cart", async ({ page, homePage, shopPage, cartPage, paymentsPage, loginPage, wishListPage }) => {
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
      await shopPage.filterByCategory('Shop by Category', 'Headsets');
      const totalCountAfter = Number(await shopPage.getTotalProductsCount());
      expect(totalCountAfter).toBeLessThan(totalCountBefore);
    })

    await test.step('Verify user is able to view details of first product', async () => {
      await shopPage.navigateToDetailsPageOfFirstProduct();
    })

    await test.step('Verify user is able to add the product to cart and reset the cart', async () => {
      await shopPage.addProductToCart();
      await cartPage.clickCartIcon();
      await cartPage.clickResetCart();
    })

    await test.step("Verify if the cart count is 0", async () => {
      const cartCount = await cartPage.getCartCount();
      expect(cartCount, 'Cart count should be ').toBe(0);
    })


  })




})

