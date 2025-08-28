import { expect, test } from "../pages/customFixture";

test.describe("Shop page related basic flows", async () => {


  test("TC001 Verify products can be filtered by brand name @smoke", async ({ page, homePage, shopPage }) => {
    await homePage.launchWebApp();
    await homePage.openShopPage();
    const totalCountBefore = Number(await shopPage.getTotalProductsCount());
    await shopPage.filterByBrand('Samsung');
    const totalCountAfter = Number(await shopPage.getTotalProductsCount());
    expect(totalCountAfter).toBeLessThan(totalCountBefore);
  })

  test.skip("TC002 Verify something else", async ({ page, homePage, shopPage }) => {
  })

  test.fixme("TC003 An incomplete test case needing fix", async ({ page, homePage }) => {
    await homePage.launchWebApp();
    await homePage.openShopPage();
    await expect(true).toBe(false);
  })

  test("TC099 A TC which will fail", async ({ page, homePage }) => {
    await homePage.launchWebApp();
    await homePage.openShopPage();
    await expect(true, "True should be ").toBe(false);
  })

})

