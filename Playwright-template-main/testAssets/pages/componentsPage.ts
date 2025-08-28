import { Locator, Page, expect, test } from "@playwright/test";
import Actions from "../../helper/actions";
import HomePage from "./homePage";
import path from "path";

export default class ComponentsPage extends HomePage {
    public actions: Actions

    strBrandCheckBox = (brandName) => `//li[text()='${brandName}']/input`

    homeMenu: Locator;
    brandCheckbox: Locator;
    popWindowLearnMore: Locator;
    openPopWindowButton: Locator;
    popWindowContentTitle: Locator;
    closePopWindowButton: Locator;
    shadowDomLearnMore: Locator;
    openShadowDOMtitle: Locator;
    closedShadowDOMtitle: Locator;
    nameInputBox: Locator;
    uploadFileLearnMore: Locator;
    fileInputBox: Locator;
    dragAndDropUploadFileLearnMore: Locator;
    dragAndDropFileInputBox: Locator;
    selectedFile: Locator;

    constructor(public page: Page) {
        super(page);
        this.page = page;
        this.actions = new Actions(this.page);

        this.homeMenu = this.page.getByRole('link', { name: 'Home' });
        this.popWindowLearnMore = this.page.locator('.transform', { hasText: 'Pop Window Component' }).locator('a')
        this.openPopWindowButton = this.page.getByRole('button', { name: 'Open Pop Window' })
        this.popWindowContentTitle = this.page.getByRole('heading', { name: 'Pop Window Content' })
        this.closePopWindowButton = this.page.getByRole('button', { name: 'Close' });
        this.shadowDomLearnMore = this.page.locator('.transform', { hasText: 'Shadow DOM Component' }).locator('a');
        this.openShadowDOMtitle = this.page.locator('div.shadow-host:first-of-type .shadow-content .shadow-title');
        // this.openShadowDOMtitle = this.page.locator('div.shadow-host:nth-of-type(1) .shadow-content .shadow-title');
        this.closedShadowDOMtitle = this.page.locator('div.shadow-host:last-of-type');
        this.nameInputBox = this.page.locator("#inputForName");
        this.uploadFileLearnMore = this.page.locator("//a[@href='/components/upload']");
        this.fileInputBox = this.page.locator("//input[@type='file']")
        this.dragAndDropUploadFileLearnMore = this.page.locator('.transform', { hasText: 'Drag and Drop File Upload Component' }).locator('a');
        this.dragAndDropFileInputBox = this.page.locator("//label[text()='Drag and drop files here']")
        this.selectedFile = page.locator("//h2[text()='Selected File:']//following-sibling::p");

    }

    async verifyUploadFile() {
        await test.step('Open Upload file page', async () => {
            await this.actions.clickOn(this.uploadFileLearnMore, "Learn More in Upload File")
            await expect(this.fileInputBox, 'File upload box should be ').toBeVisible();
            const fileName = "logo_playwright.png";
            await this.fileInputBox.setInputFiles(fileName);
            const uploadedFileName = await this.selectedFile.textContent();
            expect(uploadedFileName, 'Uploaded file name should be ' ).toBe(fileName);
            console.log('All good');
        })
    }


    async verifyDragAndDropUploadFile() {
        await test.step('Open Drag and Drop Upload file page', async () => {
            await this.actions.clickOn(this.dragAndDropUploadFileLearnMore, "Learn More in Drag and Drop Upload File")
            await expect(this.dragAndDropFileInputBox, 'File upload box should be ').toBeVisible();
            // await this.dragAndDropFileInputBox.setInputFiles('logo_playwright.png');
            await this.page.dispatchEvent("//label[text()='Drag and drop files here']", 'drop', {
                dataTransfer: {
                  files: [new File(['content'], 'logo_playwright.png', { type: 'image/png' })],
                },
              });
            await this.page.waitForTimeout(5500);
            console.log('All good ');
        })
    }

    async filterByBrand(brandName: string) {
        await test.step(`Filtering by brand ${brandName}`, async () => {
            await this.actions.clickOn(this.page.locator(this.strBrandCheckBox(brandName)), `${brandName} checkbox`);
            await this.actions.waitForPageToLoad();
            await expect(this.productsTitle, "Shope page with Products title should be ").toBeVisible();
        })
    }

    async openPopWindowAndVerify() {
        await test.step('Open Pop window page', async () => {
            await this.actions.clickOn(this.popWindowLearnMore, "Learn More in Pop window tile")
            await this.actions.clickButton(this.openPopWindowButton, "Open PopWindow")
            // await this.popWindowContentTitle.isVisible();    
            await expect(this.popWindowContentTitle, 'PopWindowContentTitle should be ').toBeVisible();
            await this.actions.clickButton(this.closePopWindowButton, "Close Pop Window");
            await expect(this.openPopWindowButton).toBeEnabled();
        })
    }


    async verifyShadowDomOpen() {
        await test.step('Open Shadow DOM Component page', async () => {
            await this.actions.clickOn(this.shadowDomLearnMore, "Learn More in Shadow DOM tile")
            await expect(this.openShadowDOMtitle, 'Shadow DOM title should be ').toBeVisible();
            const openTexts = await this.openShadowDOMtitle.textContent();
            console.log('Open texts is ', openTexts);
        })
    }


    async verifyShadowDomClosed() {
        await test.step('Open Shadow DOM Component page', async () => {
            await this.actions.clickOn(this.shadowDomLearnMore, "Learn More in Shadow DOM tile")
            await expect(this.openShadowDOMtitle, 'Shadow DOM title should be ').toBeVisible();
            await this.actions.clickOn(this.nameInputBox, "Enter name input")
            let nameText = await this.nameInputBox.innerText();
            console.log('Name text content is ', nameText);

            await this.page.locator("#inputForName").click();
            await this.page.locator("#inputForName").fill("Arun")
            await this.page.keyboard.press('Tab');
            await this.page.waitForTimeout(1000);
            await this.page.keyboard.type('Superman');
            await this.page.waitForTimeout(1000);
            await this.page.keyboard.press('Meta+A')
            await this.page.keyboard.press('Meta+c');
            const copiedText = await this.page.evaluate(async () => {
                return await navigator.clipboard.readText();
            });
            console.log("Copied Text is ", copiedText);
        })
    }

}