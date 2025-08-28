import { Locator, Page, expect, test } from "@playwright/test";
import fs from "fs";
import * as env from "../testAssets/test-data/env-waits.json";

export default class Actions {
  constructor(public page: Page) {
    this.page = page;
  }

  /**
   * Method to load test data
   * @param testData environment test data name
   */
  static loadTestData(testData: String) {
    const filePath = `./test-data/${testData}`;
    const fPath = "./test-data/env-waits.json";
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }
      fs.writeFile(fPath, data, "utf-8", (writeErr) => {
        if (writeErr) {
          console.error("Error writing file:", writeErr);
          return;
        }
        console.log("JSON values replaced and file updated.");
      });
    });
  }

  async waitForApiResponse(
    api,
    timeoutInMilliSeconds = env.waitFor.APITIMEOUT
  ) {
    console.log(`Waiting for API call: ${api} - start`);
    const before = performance.now();
    await test.step(`Waiting for API call: ${api}`, async () => {});
    try {
      await this.page.waitForResponse((resp) => resp.url().includes(api), {
        timeout: timeoutInMilliSeconds,
      });
    } catch (error) {
      const after = performance.now();
      const timeTaken = (after - before) / 1000;
      console.error(
        `\n Failed: -- Waited for ${timeTaken.toFixed(
          2
        )} seconds for API call : ${api} \n`
      );
      return;
    }
    const after = performance.now();
    const timeTaken = (after - before) / 1000;
    console.log(
      `Waiting for API call: ${api} - Finished after ${timeTaken.toFixed(
        2
      )} seconds`
    );
  }

  async waitForMultipleApiResponse(api) {
    await test.step(`Waiting for API calls multiple: ${api}`, async () => {});
    const before = performance.now();
    console.log(`Waiting for API calls multiple: ${api}`);
    try {
      const responsePromises = [
        await this.fetchResponse(api),
        await this.fetchResponse(api),
      ];
      await Promise.all(responsePromises);
    } catch (error) {
      const after = performance.now();
      const timeTaken = (after - before) / 1000;
      console.error(
        `\n Failed: -- Waited for ${timeTaken.toFixed(
          2
        )} seconds for API calls multiple: ${api} \n`
      );
      return;
    }
    const after = performance.now();
    const timeTaken = (after - before) / 1000;
    console.log(
      `Waiting for API calls multiple: ${api} - Finished after ${timeTaken.toFixed(
        2
      )} seconds`
    );
  }

  async waitForPageToLoad(timeToWait = env.waitFor.MAX) {
    await test.step(`Waiting for the page to load`, async () => {
      try {
        await this.page.waitForLoadState("domcontentloaded", {
          timeout: env.waitFor.LOW,
        });
        await this.page.waitForTimeout(env.waitFor.MIN);
        await this.page.waitForLoadState("networkidle", {
          timeout: timeToWait,
        });
        await this.page.waitForLoadState("domcontentloaded", {
          timeout: timeToWait,
        });
        await this.page.waitForTimeout(env.waitFor.MIN);
        await this.page.waitForLoadState("networkidle", {
          timeout: env.waitFor.HIGH,
        });
      } catch {
        await this.page.waitForLoadState("domcontentloaded", {
          timeout: timeToWait,
        });
      }
    });
  }

  async waitForElementToBeAttached(locator: Locator) {
    const before = performance.now();
    await expect(locator).toBeVisible({ timeout: env.waitFor.VERYHIGH });
    await locator.waitFor({ state: "attached", timeout: env.waitFor.HIGH });
    await locator.isEnabled({ timeout: env.waitFor.HIGH });
    await this.page.waitForTimeout(env.waitFor.MIN);
    await locator.scrollIntoViewIfNeeded({ timeout: env.waitFor.HIGH });
    const after = performance.now();
    const timeTaken = (after - before) / 1000;
    if (timeTaken > 10) {
      console.warn(
        `It took ${timeTaken.toFixed(
          2
        )} for the element ${locator} to be visible & attached`
      );
    }
  }

  async waitForElementToBeVisible(locator: Locator) {
    await expect(locator).toBeVisible({ timeout: env.waitFor.VERYHIGH });
    try {
      await locator.scrollIntoViewIfNeeded({ timeout: env.waitFor.LOW });
    } catch (error) {}
  }

  /** Blindly checks if an element is not present on the screen, without checking it's appearance on the screen first
   * If you want to check the existence of the element first and then it's not visible, then use waitForElementToBeDisappear().
   * Time consumed for execution shall be less in the  waitForElementToBeNotVisible() than waitForElementToBeDisappear() **/
  async waitForElementToBeNotVisible(locator: Locator) {
    await expect(locator).not.toBeVisible({ timeout: env.waitFor.VERYHIGH });
  }

  /** Checks first the existence of the element and then it is not present on the screen
   * Time consumed for execution shall be more in the  waitForElementToBeNotVisible() than waitForElementToBeDisappear()
   *  **/
  async waitForElementToBeDisappear(locator: Locator) {
    await expect(locator).toBeVisible({ timeout: env.waitFor.VERYHIGH });
    await expect(locator).not.toBeVisible({ timeout: env.waitFor.HIGH });
  }

  async waitForElementToBeEnabled(locator: Locator) {
    try {
      await expect(locator).toBeVisible({ timeout: env.waitFor.VERYHIGH });
      await locator.isEnabled({ timeout: env.waitFor.HIGH });
      await this.page.waitForTimeout(env.waitFor.MIN);
      await locator.scrollIntoViewIfNeeded({ timeout: env.waitFor.HIGH });
    } catch (e) {
      console.log(
        "\n Met with error wait waiting for the locator -->  ",
        locator,
        "\n"
      );
    }
  }
  /**
   * @author arundevtm
   * @modifiedBy arundevtm
   * @modifiedOn 12th July, 23
   */
  async clickOn(locator: Locator, friendlyNameOfButton: string) {
    await this.waitForElementToBeEnabled(locator);
    let loggingLine = "Clicking on ";
    loggingLine =
      friendlyNameOfButton != undefined
        ? loggingLine + friendlyNameOfButton
        : loggingLine;
    console.log(loggingLine);
    await test.step(loggingLine, async () => {
      // await locator.click({ timeout: env.waitFor.HIGH });
      await locator.click();
    });
  }
  async clickButton(locator: Locator, friendlyNameOfButton: string) {
    await this.waitForElementToBeAttached(locator);
    let loggingLine = "Clicking on button ";
    loggingLine =
      friendlyNameOfButton != undefined
        ? loggingLine + friendlyNameOfButton
        : loggingLine;
    console.log(loggingLine);
    await test.step(loggingLine, async () => {
      await locator.click({ timeout: env.waitFor.HIGH });
    });
  }

  async clickDropdown(locator: Locator, friendlyNameOfButton: string) {
    await this.waitForPageToLoad();
    await this.waitForElementToBeEnabled(locator);
    let loggingLine = "Clicking on dropdown : ";
    loggingLine =
      friendlyNameOfButton != undefined
        ? loggingLine + friendlyNameOfButton
        : loggingLine;
    console.log(loggingLine);
    await test.step(loggingLine, async () => {
      await locator.click();
    });
    await this.waitForPageToLoad();
  }
  async clickCheckBox(locator: Locator, friendlyNameOfButton?: string) {
    await this.waitForElementToBeAttached(locator);
    let loggingLine = "Clicking on checkbox for: ";
    loggingLine =
      friendlyNameOfButton != undefined
        ? loggingLine + friendlyNameOfButton
        : loggingLine;
    console.log(loggingLine);
    await test.step(loggingLine, async () => {
      if (!(await locator.isChecked())) {
        console.log("The checkbox is not selected, hence clicking on it: ");
        await locator.check({ timeout: env.waitFor.HIGH });
      }
    });
  }

  async clearOnly(locator: Locator, friendlyNameOfField?: string) {
    await this.waitForElementToBeVisible(locator);
    await locator.fill("");
  }

  async typeText(locator: Locator, valueToEnter, friendlyNameOfField?: string) {
    await this.waitForElementToBeVisible(locator);
    let loggingLine = `Entering the value:> ${valueToEnter} <:in `;
    loggingLine =
      friendlyNameOfField != undefined
        ? loggingLine + friendlyNameOfField
        : loggingLine;
    console.log(loggingLine);
    await test.step(loggingLine, async () => {
      await locator.pressSequentially(valueToEnter);
    });
  }

  async clearAndType(
    locator: Locator,
    valueToEnter,
    friendlyNameOfField?: string
  ) {
    await this.waitForElementToBeVisible(locator);
    await locator.clear();
    let loggingLine = `Clearing the current value in field and entering the value:> ${valueToEnter} <:in `;
    loggingLine =
      friendlyNameOfField != undefined
        ? loggingLine + friendlyNameOfField
        : loggingLine;
    await test.step(loggingLine, async () => {
      await locator.fill(valueToEnter);
    });
  }

  async doubleClickOn(locator: Locator, friendlyNameOfButton?: string) {
    await this.waitForElementToBeAttached(locator);
    let loggingLine = "Double clicking on ";
    loggingLine =
      friendlyNameOfButton != undefined
        ? loggingLine + friendlyNameOfButton
        : loggingLine;
    console.log(loggingLine);
    await test.step(loggingLine, async () => {
      await locator.dblclick({ timeout: env.waitFor.HIGH });
    });
  }

  async acceptAlert() {
    await test.step("Accepting the dialog box with Ok/Confirm", async () => {
      this.page.on("dialog", async (alert) => {
        await alert.accept();
      });
    });
  }

  async getVisitCategoryByEvaluate(strLocator: string) {
    await this.page.waitForTimeout(env.waitFor.MIN);
    const Ext: any = undefined;
    const selection = await this.page.evaluate(
      ({ strLocator }) =>
        Ext.Component.from(document.querySelector(strLocator))
          .getPicker()
          .getSelection().data.category_with_all_ancestors,
      { strLocator }
    );
    return selection;
  }

  async getSelectionDisplayNameByEvaluate(strLocator: string) {
    await this.page.waitForTimeout(env.waitFor.MIN);
    const Ext: any = undefined;
    const selection = await this.page.evaluate(
      ({ strLocator }) =>
        Ext.Component.from(document.querySelector(strLocator)).getSelection()
          .display_name,
      { strLocator }
    );
    console.log("selection found as", selection);
    return selection;
  }

  async getSelectionClientByEvaluate(strLocator: string) {
    await this.page.waitForTimeout(env.waitFor.MIN);
    const Ext: any = undefined;
    const selection = await this.page.evaluate(
      ({ strLocator }) =>
        Ext.Component.from(document.querySelector(strLocator)).getSelection()
          .default_general_address.company,
      { strLocator }
    );
    console.log("selection found as", selection);
    return selection;
  }

  async getSelectionDataByEvaluate(strLocator: string) {
    // await this.page.waitForTimeout(env.waitFor.MIN);
    await this.waitForPageToLoad();
    const Ext: any = undefined;
    const selection = await this.page.evaluate(
      ({ strLocator }) =>
        Ext.Component.from(document.querySelector(strLocator)).getSelection()
          .data,
      { strLocator }
    );
    console.log("selection found as", selection);
    return selection;
  }

  async getSelectionByEvaluate(strLocator: string) {
    await this.page.waitForTimeout(env.waitFor.MIN);
    const Ext: any = undefined;
    const selection = await this.page.evaluate(
      ({ strLocator }) =>
        Ext.Component.from(document.querySelector(strLocator)).getSelection(),
      { strLocator }
    );
    return selection;
  }

  async getValueByEvaluate(strLocator: string) {
    await this.page.waitForTimeout(env.waitFor.MIN);
    const Ext: any = undefined;
    const value = await this.page.evaluate(
      ({ strLocator }) =>
        Ext.Component.from(document.querySelector(strLocator)).getValue(),
      { strLocator }
    );
    return value;
  }

  async getSelectionInputValueByEvaluate(strLocator: string) {
    await this.page.waitForTimeout(env.waitFor.MIN);
    const Ext: any = undefined;
    const inputValue = await this.page.evaluate(
      ({ strLocator }) =>
        Ext.Component.from(document.querySelector(strLocator)).getInputValue(),
      { strLocator }
    );
    console.log(
      "input value in getSelectionInputValueByEvaluate :",
      inputValue
    );
    return inputValue;
  }

  async uploadFile(locator: Locator, filePathAndName: string) {
    await locator.setInputFiles(filePathAndName);
  }

  async getDynamicLocator(locatorString: string, newValueToReplace: string) {
    const strOfElement = locatorString.replace(
      "valueToBeReplaced",
      newValueToReplace
    );
    console.log("Dynamic locator string ", strOfElement);
    await this.page.waitForTimeout(env.waitFor.MIN);
    const element: Locator = this.page.locator(strOfElement);
    return element;
  }

  async zoomInBrowser() {
    await this.page.evaluate('document.body.style.zoom = "50%"');
  }

  async verifyEmailFormat(email) {
    let regex = new RegExp("[A-Za-z0-9_]+@[A-Za-z]+.[A-Za-z]");
    const checkEmail = regex.test(email);
    return checkEmail;
  }

  async fetchResponse(api) {
    const response = await this.page.waitForResponse(
      (response) => response.url().includes(api),
      { timeout: env.waitFor.APITIMEOUT }
    );
    console.log(`>>>>>>>>> response status of ${api} is ${response.status()}`);
    return response;
  }

  async getTextContent(locator) {
    await expect(locator).toBeVisible({ timeout: env.waitFor.HIGH });
    const text = await locator.textContent();
    return text;
  }

  static async compareArrayWithJSONvalues(json: Object, array: Array<String>) {
    let jsArray: Array<String> = [];
    for (const key in json) {
      const item = json[key];
      jsArray.push(item);
    }
    jsArray.sort();
    array.sort();
    console.log("Expected json array: ", jsArray);
    console.log("Actual array: ", array);

    const result = JSON.stringify(jsArray) === JSON.stringify(array);
    console.log("result is", result);
    return result;
  }

  static async checkJSONContainsArrayvalues(
    json: Object,
    array: Array<String>
  ) {
    // let jsArray: Array<String> = [];
    // for (const key in json) {
    //     const item = json[key];
    //     jsArray.push(item);
    // }
    const jsArray: Array<String> = Object.values(json);
    jsArray.sort();
    array.sort();
    console.log("Expected json array: ", jsArray);
    console.log("Actual array: ", array);

    for (const element of jsArray) {
      if (!array.includes(element)) {
        console.log("Result doesn't contain ", element);
        return false;
      }
    }
    return true;
  }

  async scrollDownToTarget(targetSelector) {
    const viewportHeight = await this.page.evaluate(() => {
      return window.innerHeight;
    });
    const startTime = performance.now();
    const scrollTimeout = env.waitFor.HIGH;
    while (true) {
      if (performance.now() - startTime > scrollTimeout) {
        throw new Error("Timeout reached while scrolling through for element");
      }
      await this.page.waitForLoadState("domcontentloaded");
      if (await this.page.locator(targetSelector).isVisible()) {
        break;
      }
      await this.page.mouse.wheel(0, viewportHeight / 100);
    }
  }

  async scrollDownToTargetLocator(targetSelector) {
    const viewportHeight = await this.page.evaluate(() => {
      return window.innerHeight;
    });
    const startTime = performance.now();
    const scrollTimeout = env.waitFor.HIGH;
    while (true) {
      if (performance.now() - startTime > scrollTimeout) {
        throw new Error("Timeout reached while scrolling through for element");
      }
      await this.page.waitForLoadState("domcontentloaded");
      if (await targetSelector.isVisible()) {
        break;
      }
      await this.page.mouse.wheel(0, viewportHeight / 100);
    }
  }

  async matchResults(functionToRetry, expected) {
    await expect(async () => {
      const actual = await functionToRetry();
      console.log("actual in matchResults is ", actual);
      expect(actual).toBe(expected);
      if (actual == expected) {
        return true;
      }
    }).toPass({
      intervals: [2_000, 5_000],
      timeout: 60_000,
    });
    return false;
  }

  async downloadAndSaveFile(locator: Locator) {
    const download = await Promise.all([
      this.page.waitForEvent("download", { timeout: env.waitFor.VERYHIGH }),
      this.clickOn(locator, "Download/Save"),
    ]);

    let fileName = download[0].suggestedFilename();
    await download[0].saveAs("downloadedReport/" + fileName);
    console.log("downloadedReport" + "//" + fileName, "This is file Path");
    return fileName;
  }

  async doubleClickAndDownloadFile(locator: Locator) {
    const download = await Promise.all([
      this.page.waitForEvent("download"),
      await this.doubleClickOn(locator),
    ]);

    let fileName = download[0].suggestedFilename();
    await download[0].saveAs("downloadedReport/" + fileName);
    console.log("downloadedReport" + "//" + fileName, "This is file Path");
    return fileName;
  }
}
