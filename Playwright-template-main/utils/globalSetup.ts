import { FullConfig } from "@playwright/test";
import dotenv from "dotenv";

async function globalSetup(config: FullConfig) {
  console.log("Setting environment path...");
  if (process.env.ENV) {
    dotenv.config({
      path: `env/.env.${process.env.ENV}`,
      override: true,
    });
  } else {
    process.env.ENV = "stage";
    dotenv.config({
      path: `env/.env.${process.env.ENV}`,
      override: true,
    });
    // await Actions.loadTestData(String(process.env.testData));
  }
  // await Actions.loadTestData(String(process.env.testData));
}

export default globalSetup;
