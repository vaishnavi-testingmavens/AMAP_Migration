import { Locator, Page, expect, test } from "@playwright/test";
import Actions from "../../helper/actions";
import HomePage from "./homePage";

export default class ShopPage extends HomePage {
    public actions: Actions

    strBrandCheckBox = (brandName) => `//li[text()='${brandName}']/input`
    strCategoryCheckBox = (category) => `//input[@id='${category}']`

    strShopByField = (type) => `//span[text()='${type}']//parent::div`

    homeMenu: Locator;
    shopMenu: Locator;
    componentsMenu: Locator;
    productsTitle: Locator;
    brandCheckbox: Locator;
    totalProducts: Locator;
    firstItemShown: Locator;
    firstItemFlexMenu: Locator;
    viewDetailsButtons: Locator;
    productPicture: Locator;
    descriptionSubHeading: Locator;
    addToCartButton: Locator;
    addToWishListButton: Locator;
    addToCartToast: Locator;
    addToWishListToast: Locator;
    buyNowButton: Locator;
    cartHeading: Locator;

    constructor(public page: Page) {
        super(page);
        this.page = page;
        this.actions = new Actions(this.page);

        this.shopMenu = this.page.getByRole('link', { name: 'Shop' });
        this.componentsMenu = this.page.getByRole('link', { name: 'Components' });
        this.homeMenu = this.page.getByRole('link', { name: 'Home' })
        this.productsTitle = this.page.getByRole('heading', { name: 'Products' });
        this.totalProducts = this.page.locator("//p[contains(text(),'Products from ')]");
        this.firstItemShown = this.page.locator("//img[contains(@alt,'/assets')]");
        this.firstItemFlexMenu = this.page.locator('.w-full > ul').first();
        this.viewDetailsButtons = this.page.locator("//li[text()='View Details']");
        this.productPicture = this.page.locator("//img[@class='w-full h-full object-contain']");
        this.descriptionSubHeading = this.page.getByRole('button', { name: 'Description' })
        this.addToCartButton = this.page.getByRole('button', { name: 'Add to Cart' });
        this.addToWishListButton = this.page.getByRole('button', { name: 'Add to Wishlist' });
        // Need to update the 'Successfully' spelling after bug fix
        this.addToCartToast = this.page.locator("//div[text()='Added Succesfully!']");
        this.addToWishListToast = this.page.locator("//div[text()='Product added to wish List']");
        this.buyNowButton = this.page.getByRole('link', { name: 'Buy Now' });
        this.cartHeading = this.page.getByRole('heading', { name: 'Cart', exact: true });


    }



    async filterByBrand(brandName: string) {
        await test.step(`Filtering by brand ${brandName}`, async () => {
            await this.actions.clickOn(this.page.locator(this.strBrandCheckBox(brandName)), `${brandName} checkbox`);
            await this.actions.waitForPageToLoad();
            await expect(this.productsTitle, "Shope page with Products title should be ").toBeVisible();
        })
    }

    async filterByCategory(type: string, category: string) {
        await test.step(`Filtering by category ${category}`, async () => {
            await this.actions.clickOn(this.page.locator(this.strShopByField(type)), `Expand ${type}`);
            await this.actions.clickOn(this.page.locator(this.strCategoryCheckBox(category)), `${category} checkbox`);
            await this.actions.waitForPageToLoad();
            await expect(this.productsTitle, "Shop page with Products category should be ").toBeVisible();
        })
    }

    async getTotalProductsCount() {
        const totalCount = await test.step('Get total count of products listed', async () => {
            const totalProductsText = await this.totalProducts.textContent();
            console.log('totalProductsText is ', totalProductsText);
            const textArray = totalProductsText + "";
            const totalCount = Number(textArray.split(" ")[6]);
            return totalCount;
        })
        return totalCount;
    }

    async hoverOnFirstProductAndVerifyFlexMenu() {
        await test.step(`Hover on the first item and check flex menu is shown`, async () => {
            await this.firstItemShown.first().hover();
            await expect(this.firstItemFlexMenu, 'First product flex menu should be ').toBeVisible();
        })
    }

    async navigateToDetailsPageOfFirstProduct() {
        await test.step(`Click on View Details and navigate to Details page for first product`, async () => {
            // no view button, just click first product
            // await this.actions.clickOn(this.viewDetailsButtons.first(),'View Details Button');
            await this.actions.clickOn(this.productPicture.first(), 'Product picture');
            await expect(this.descriptionSubHeading, 'Description SubHeading should be ').toBeVisible();
        })
    }

    async addProductToCart() {
        await test.step(`Add product to the cart`, async () => {
            await this.actions.clickOn(this.addToCartButton.first(), 'Add To Cart button');
            await expect(this.addToCartToast, 'Product added to cart toast should be ').toBeVisible();
        })
    }

    async addAnotherProductToCart(category: string) {
        await test.step(`Add another product from different category to the cart`, async () => {
            await this.actions.clickOn(this.page.locator(this.strCategoryCheckBox(category)), `${category} checkbox`);
            await this.actions.clickOn(this.addToCartButton.first(), 'Add To Cart button');
            await expect(this.addToCartToast, 'Product added to cart toast should be ').toBeVisible();
        })
    }

    async addProductToWishList() {
        await test.step(`Add product to the wish list`, async () => { })
        await this.actions.clickOn(this.addToWishListButton, 'Add To Wish List button');
        //return await expect(this.addToWishListToast, 'Product added to wish list toast should be ').toBeVisible();
        await this.actions.waitForElementToBeVisible(this.addToWishListToast);
        return this.addToWishListToast.isVisible();

    }

    async proccedToCartPage() {
        await test.step(`Click on Buy Now button and proceed to the Cart page`, async () => {
            await this.actions.clickOn(this.buyNowButton, 'Buy Now button');
            await expect(this.cartHeading, 'Cart Page heading should be ').toBeVisible();
        })
    }

}