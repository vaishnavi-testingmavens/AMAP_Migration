import { test as setup } from "@playwright/test";
import LoginPage from "../pages/loginPage";

const adminAuthFile = 'playwright/.auth/admin.json'

setup('AuthenticateAtSetUpAdmin', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.launchBrowserAndloginToApp(process.env.base_Url, process.env.user_Name, process.env.password);
    await page.context().storageState({ path: adminAuthFile });
})