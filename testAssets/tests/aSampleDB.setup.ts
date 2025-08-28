import { test as setup } from "@playwright/test";
import DbSetUp from "../../helper/createSamplePostgreDB";

/*  This test/setup helps in setting up a sample PostgreSQL DB with some data for doing hands on for DB test cases
  If you have real PostgreSQL QA database to connnect, then you dont need to call this test/setup
*/
setup("SetUpDBAndData", async ({}) => {
  await DbSetUp.setUpDb();
  // console.log("DB set up script is completed");
});
