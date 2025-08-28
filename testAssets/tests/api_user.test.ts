import { expect, test } from "@playwright/test";
import UserApis from "../businessFunctions/userAPIs";
import * as userData from "../test-data/user-data.json";
import GenericFunctions from "../../helper/genericFunctions";
import Random from "../../helper/random";

test.describe("User related API validations", async () => {
  test("Verify new user can be created", async ({ request }) => {
    let response;
    let responseJsonFormat;
    await test.step("Call the Post API to create new user with given data", async () => {
      const email =
        "john.doe" + Random.getRandomAlphaNumeric(4) + "@example.com";
      response = await UserApis.registerUser(email);
      responseJsonFormat = await response[0].json();
      console.log("responseJsonFormat is ", responseJsonFormat);
      await expect(response).not.toBeNull();
    });

    await test.step("JSON schema validation - Verify that response data has important keys and type of keys", async () => {
      // Define JSON Schema for to match with the response body
      const schema = userData.schema;
      await GenericFunctions.validateSchema(responseJsonFormat, schema);
    });
  });

  test("Verify new user can be created with invalid email", async ({
    request,
  }) => {
    let response;
    let responseJsonFormat;
    await test.step("Call the Post API to create new user with given data", async () => {
      const email = "john.doe";
      response = await UserApis.registerUser(email);
      responseJsonFormat = await response[0].json();
      console.log("responseJsonFormat is ", responseJsonFormat);
      await expect(response).not.toBeNull();
    });

    await test.step("JSON schema validation - Verify that response data has important keys and type of keys", async () => {
      // Define JSON Schema for to match with the response body
      const schema = userData.schema;
      await GenericFunctions.validateSchema(responseJsonFormat, schema);
    });
  });
});
