import { expect, test } from "@playwright/test";
import { PostgreDbHelper } from "../../helper/postgreDbHelper";
import * as queries from "../../helper/sqlQueries";
import Random from "../../helper/random";

// Below group of sample tests are written by considering the data created with the help of setup project mentioned in playwright.config file.
test.describe("Sample DB validations", async () => {
  test("Verify a single column result item can be queried", async ({}) => {
    const value = await PostgreDbHelper.queryForResultItemValue(
      queries.getAccountDetails,
      "account_holder_name"
    );
    console.log("value found as ", value);
  });

  test("Verify a single row of result  can be queried", async ({}) => {
    const value = await PostgreDbHelper.queryForResultObject(
      queries.getAccountDetails
    );
    console.log("value found as ", value);
  });

  test("Verify N number of rows of data can be queried", async ({}) => {
    const value = await PostgreDbHelper.queryForResultArray(
      queries.get2ItemsFromTable
    );
    console.log("value found as ", value);
  });

  test("Verify 2 rows of data can be inserted", async ({}) => {
    /* This Test Case will fail if run it for the second time
    because it is inserting a static data in the first execution and on second run it will run into duplicate data */
    const success = await PostgreDbHelper.insertData(
      queries.insertFewDataIntoTable
    );
    expect(success, "Inserting data into table should be ").toBe(true);
  });

  test("Verify one row of dynamic data can be inserted", async ({}) => {
    let account_number = "ACC" + Random.getRandomNumber(10006, 99999);
    let account_balance = Number(
      Random.getRandomNumber(10006, 99999) +
        "." +
        Random.getRandomNumber(10, 99)
    );
    let query = queries.insertAccountQuery(
      "John Doe",
      account_number,
      "Savings",
      account_balance,
      true
    );
    const success = await PostgreDbHelper.insertData(query);
    expect(success, "Inserting data into table should be ").toBe(true);
  });
});
