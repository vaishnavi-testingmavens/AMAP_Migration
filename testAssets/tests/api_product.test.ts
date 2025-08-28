import { expect, test } from "@playwright/test";
import ProductsApis from "../businessFunctions/productsAPIs";
import * as brandsData from "../test-data/brands-data.json";
import * as productsData from "../test-data/products-data.json";
import GenericFunctions from "../../helper/genericFunctions";

test.describe("Product search & filtering flows", async () => {
  test("Get product by brands", async ({ request }) => {
    let response;
    let responseJsonFormat;
    await test.step("Call the Get API to list the brands", async () => {
      response = await ProductsApis.getAllBrands();
      responseJsonFormat = await response[0].json();
      console.log("responseJsonFormat is ", responseJsonFormat);
      await expect(response).not.toBeNull();
    });

    await test.step("JSON schema validation - Verify that response data has important keys and type of keys", async () => {
      // Define JSON Schema for to match with the response body
      const schema = brandsData.schema;
      await GenericFunctions.validateSchema(responseJsonFormat, schema);
    });
  });

  test("Get product by color", async ({ request }) => {
    let response;
    let responseJsonFormat;
    await test.step("Call the Get API to filter products by color", async () => {
      response = await ProductsApis.getProductByColor("White");
      responseJsonFormat = await response[0].json();
      console.log("responseJsonFormat is ", responseJsonFormat);
      await expect(response).not.toBeNull();
    });

    await test.step("JSON schema validation - Verify that response data has important keys and type of keys", async () => {
      // Define JSON Schema for to match with the response body
      const schema = productsData.schema;
      await GenericFunctions.validateSchema(responseJsonFormat, schema);
    });
  });

  test("Filter by invalid color", async ({ request }) => {
    let response;
    let responseJsonFormat;
    await test.step("Call the Get API to filter products by invalid color", async () => {
      response = await ProductsApis.getProductByColor("Teal");
      responseJsonFormat = await response[0].json();
      console.log("responseJsonFormat is ", responseJsonFormat);
      await expect(response).not.toBeNull();
    });

    await test.step("JSON schema validation - Verify that response data has important keys and type of keys", async () => {
      // Define JSON Schema for to match with the response body
      const schema = productsData.schema;
      await GenericFunctions.validateSchema(responseJsonFormat, schema);
    });
  });
});
