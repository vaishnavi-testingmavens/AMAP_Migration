import type {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestResult,
} from "@playwright/test/reporter";
import fs from "fs";
import path from "path";
import DateTime from "../helper/dateTime";
import PerformanceDBHelper from "../helper/performanceDBHelper";
import MsTeamsBot from "./msTeamsBot";
import PerformanceBot from "./performanceBot";
import JiraBot from "./jiraBot";

class MavensReporter implements Reporter {
  mySuite: Suite;
  private onBeginPromise: Promise<void>;
  durationInMinutes: number;
  testDuration;
  startTime;
  endTime;

  private outputDir = path.join(__dirname, "../performanceArtifacts");

  performanceDbHelper: PerformanceDBHelper;

  testSummaryMap = new Map();

  resultTab = {
    TotalTests: 0,
    PassedTests: 0,
    FailedTests: 0,
    TimeOutTests: 0,
    FlakyTests: 0,
    NoRunTests: 0,
    ExecutionStartTime: "",
    ExecutionEndTime: "",
    ExecutionDurationInHoursAndMinutes: "",
  };

  constructor(options: { customOption?: string } = {}) {
    console.log(
      `Mavens Reporter setup with customOption set to ${options.customOption}`
    );
    this.performanceDbHelper = new PerformanceDBHelper();
  }

  async onBegin(config: FullConfig, suite: Suite) {
    this.mySuite = suite;
    console.log(`Starting the run with ${suite.allTests().length} tests`);
    this.resultTab.TotalTests = suite.allTests().length;
    this.resultTab.NoRunTests = suite.allTests().length;
    this.resultTab.ExecutionStartTime = DateTime.getDateTimeNow() + "";
    await this.performanceDbHelper.initializeDB();
  }

  async onTestBegin(test: TestCase) {
    if (!test.title.startsWith("AuthenticateAtSetUp")) {
      console.log(
        "Setting Jira execution status as 'No Run' for test case= ",
        test.title
      );
      // await JiraBot.setJiraTestCaseStatusAsNoRun(test);
    }
    console.log(` \n\n\n ======= Starting test ${test.title}  ======= \n`);
    this.startTime = performance.now();
  }

  async onTestEnd(test: TestCase, result: TestResult) {
    console.log(
      `\n ======= Finished test ${test.title}: ${result.status} ======= \n\n\n`
    );
    if (test.outcome() == "flaky") {
      this.testSummaryMap.set(test.title.split(" ")[0], test.outcome());
    } else {
      this.testSummaryMap.set(test.title.split(" ")[0], result.status);
    }
    this.endTime = performance.now();
    this.testDuration = this.endTime - this.startTime;
    this.durationInMinutes = DateTime.millisecondsToMinutesAndSeconds(
      this.testDuration
    );
    console.log(
      `Time taken for test ${test.title.split(" ")[0]} is ${
        this.durationInMinutes
      } minutes`
    );
    if (!test.title.startsWith("AuthenticateAtSetUp")) {
      console.log(
        "Setting Jira execution status as 'No Run' for test case= ",
        test.title
      );
      // await JiraBot.updateJiraTestCaseStatus(
      //   test,
      //   result,
      //   this.durationInMinutes
      // );
    }
  }

  async onEnd(result: FullResult) {
    for (const value of this.testSummaryMap.values()) {
      if (value == "passed") {
        this.resultTab.PassedTests++;
      } else if (value == "failed") {
        this.resultTab.FailedTests++;
      } else if (value == "timedOut") {
        this.resultTab.TimeOutTests++;
      } else if (value == "flaky") {
        this.resultTab.FlakyTests++;
      }
    }
    this.resultTab.NoRunTests =
      this.resultTab.TotalTests - this.testSummaryMap.size;
    // console.log(this.resultTab);
    this.testSummaryMap.forEach((value: string, key: string) => {
      console.log(` ${key} : ${value}`);
    });
    this.resultTab.ExecutionEndTime = DateTime.getDateTimeNow() + "";
    const suiteDuration = DateTime.millisecondsToHoursAndMinutes(
      result.duration
    );
    this.resultTab.ExecutionDurationInHoursAndMinutes = suiteDuration + "";
    console.log(`Finished the run: ${result.status}`);

    let resultMap = new Map<string, any>();
    // Iterate over the keys of the object and assign key-value pairs to the Map
    for (const key in this.resultTab) {
      if (this.resultTab.hasOwnProperty(key)) {
        resultMap.set(key, this.resultTab[key]);
      }
    }
    await MsTeamsBot.sendSummaryNotificationToTeams(
      resultMap,
      result,
      this.testSummaryMap
    );
    console.log("Sent the MS Teams notification");

    const aggregatedData = await this.performanceDbHelper.fetchAggregatedData();

    // Save JSON file
    const jsonPath = path.join(this.outputDir, "performanceMetrics.json");
    await fs.promises.writeFile(
      jsonPath,
      JSON.stringify(aggregatedData, null, 2),
      "utf-8"
    );
    console.log(`Performance data saved to ${jsonPath}`);

    await PerformanceBot.generateCsvAndChart();

    // Close the database
    await this.performanceDbHelper.closeDB();
  }
}

export default MavensReporter;
