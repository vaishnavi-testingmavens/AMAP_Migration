import { test } from "../pages/customFixture";
import * as env from "../test-data/env-waits.json";

test.describe("Components scenarios", async () => {
  test.beforeEach(
    "Launch web app and go to components page",
    async ({ page, homePage }) => {
      await homePage.launchWebApp();
      await homePage.openComponentsPage();
    }
  );
  test("TC002 Verify pop up is displayed on clicking corresponding tile in Components page", async ({
    componentsPage,
  }) => {
    await componentsPage.openPopWindowAndVerify();
  });

  test("TC003 Verify Open Shadow DOM", async ({ componentsPage }) => {
    await componentsPage.verifyShadowDomOpen();
  });

  test("TC004 Verify Closed Shadow DOM", async ({ componentsPage }) => {
    await componentsPage.verifyShadowDomClosed();
  });

  test("TC005 Verify Upload file", async ({ componentsPage }) => {
    await componentsPage.verifyUploadFile();
  });

  test("TC006 Verify Drag & Drop Upload file", async ({ componentsPage }) => {
    await componentsPage.verifyDragAndDropUploadFile();
  });
});
