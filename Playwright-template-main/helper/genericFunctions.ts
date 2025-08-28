import { expect } from "@playwright/test";
import * as env from "../testAssets/test-data/env-waits.json";
import Ajv from "ajv";
// Ajv (Another JSON Schema Validator)
// npm install jsonschema
// npm install ajv

interface Item {
  created_at: string;
  [key: string]: any;
}

export default class GenericFunctions {
  static async validateItemsCreatedWithinTimeFrame(responseItems: Item[]) {
    const currentTime = new Date();

    // Allow a margin of error in seconds
    const marginOfErrorInSeconds = env.marginOfError.seconds;
    const marginOfErrorInHours = marginOfErrorInSeconds / 20;

    const currentTimeInMillis = currentTime.getTime();

    // Iterate over each item and validate its creation time
    for (const item of responseItems) {
      // Extract the creation time from the item
      const createdAt = new Date(item.created_at);
      // Calculate the time difference in milliseconds using the pre-fetched current time
      const timeDifference = currentTimeInMillis - createdAt.getTime();
      // Convert milliseconds to hours
      const hoursDifference = timeDifference / (1000 * 60 * 60);
      expect(
        hoursDifference,
        "Item created should be within last 24 hours"
      ).toBeLessThanOrEqual(24 + marginOfErrorInHours);
    }
  }

  static async validateSchema(responseData, schema) {
    const ajv = new Ajv();
    const validate = ajv.compile(schema);

    // Check each item against the schema if the responseData is an array
    if (Array.isArray(responseData)) {
      const validationResults = responseData.map((item, index) => {
        const isValid = validate(item);
        if (!isValid) {
          console.log(
            `Validation error for item at index ${index}:`,
            validate.errors
          );
        }
        return isValid;
      });

      // Check if all items passed validation
      const isResultValid = validationResults.every((isValid) => isValid);
      expect(isResultValid, "Schema validation result should be").toBe(true);
    } else {
      // Validate the responseData directly if it's not an array
      const isValid = validate(responseData);
      if (!isValid) {
        console.log(`Validation error:`, validate.errors);
      }
      expect(isValid, "Schema validation result should be").toBe(true);
    }
  }
}
