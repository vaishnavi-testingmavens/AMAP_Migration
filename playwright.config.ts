import { PlaywrightTestConfig, devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  globalSetup: "utils/globalSetup.ts",

  //If you want to invoke Jira updation then invoke this line for MavensReporter which will run in Github Actions
  // reporter: process.env.CI ? [['dot'],['line'],['html', { open: 'always' }],['./reporters/mavensReporter.ts', { customOption: 'Github Execution' }]]
  // : [['dot'],['line'],['html', { open: 'always' }],]

  reporter: process.env.CI
    ? [["dot"], ["line"], ["html"]]
    : [
        ["html", { open: "always" }],
        ["list", { printSteps: false }],
        // ['json', { outputFile: '/test-results/results.json' }],
        // ["./reporters/mavensReporter.ts", { customOption: "Github Execution" }],
        [
          "allure-playwright",
          { detail: false, suiteTitle: true, outputFolder: "allure-results" },
        ],
      ],
  workers: 1,
  testDir: "./testAssets/tests",
  // testMatch: ["/tests/api_product.test.ts", "/tests/api_user.test.ts"],
  // testMatch: ["/tests/db_examples.test.ts"],

  timeout: 1 * 60 * 1000,
  fullyParallel: true,
  expect: {
    timeout: 20 * 1000,
  },

  use: {
    headless: false,
    screenshot: "on",
    video: "retain-on-failure",
    trace: "retain-on-failure",
    // trace: process.env.CI ? 'off' : 'on',
    // baseURL: `${process.env.domain}`,
    baseURL: process.env.ENV
      ? `${process.env.domain}`
      : "https://www.playground.testingmavens.tools",
    navigationTimeout: 1 * 60 * 1000,
    actionTimeout: 10 * 1000,
  },

  projects: [
    //Setup projects
    // {
    //   name: 'adminSetup',
    //   testMatch: /.*\Admin.setup\.ts/,
    //   retries: 1,
    // },

    /* If you want to set up a test DB and sample data then invoke the below project. 
      Corresponding connections details are present in env.stage/uat files */
    // {
    //   name: "mydbSetUp",
    //   testMatch: /.*\SampleDB.setup\.ts/,
    //   retries: 1,
    // },

    // Main project
    {
      name: "Playground UI Test on Chrome",

      use: {
        ...devices["Desktop Chrome"],
        //use prepared auth state of Admin as this is used by all TCs unless specified explicitly in describe block
        storageState: "playwright/.auth/admin.json",
      },
      /* If you want to set up a test DB and sample data then invoke the below project. 
      Corresponding connections details are present in env.stage/uat files */
      // dependencies: ["mydbSetUp"],
      fullyParallel: true,
    },
  ],
};
export default config;
