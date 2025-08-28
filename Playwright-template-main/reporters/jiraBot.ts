import { request } from '@playwright/test';
import { TestCase, TestResult } from '@playwright/test/reporter';
import * as jiraData from "../testAssets/test-data/env-jira.json";


class JiraBot {

    static async setJiraTestCaseStatusAny(testCaseId, status, timeTaken:number = 0.0) {
        const jiraUrl = jiraData.jiraUrl;
        const access_token = jiraData.access_token;
        const statusField = jiraData.automationExecutionStatusField;
        const executionTimeField = jiraData.executionTimeField;
        const url = `${jiraUrl}/${testCaseId}`;
        const putData = {
            "fields": {
                [statusField]: {
                    "value": status
                },
                [executionTimeField] : timeTaken
            }
        }

        // const jsonString = JSON.stringify(putData, null, 2); // null, 2 for pretty printing with indentation of 2 spaces
        // console.log(` \n\n\n ======= put data is  ${jsonString}  ======= \n\n`);
        
        const response = await (await request.newContext()).put(`${url}`, {
            data: putData,
            headers: {
                "Authorization": `Basic ${access_token}`
            }
        });
        const statusToUpdateJira = await response.status();
        console.log(`For TC ${testCaseId} to set the Jira Test Case status as ${status} using API call status code is  ${statusToUpdateJira}`);
    }

    static async setJiraTestCaseStatusAsNoRun(test: TestCase) {
        const testCaseId = test.title.split(" ")[0];
        // console.log("testCaseId ", testCaseId);
        await this.setJiraTestCaseStatusAny(testCaseId,"No Run");
    }

    static async updateJiraTestCaseStatus(test: TestCase, result: TestResult, timeTaken:number = 0.0) {
        const testCaseId = test.title.split(" ")[0];
        // console.log("testInfo.status  for the test case ", testCaseId, " is ", result.status);
        const automationStatus = result.status == "passed" ? "Passed" : result.status == "skipped" ? "Skipped" : "Failed";
        await this.setJiraTestCaseStatusAny(testCaseId,automationStatus,timeTaken);
    }


    //TODO: To be fixed as test result logs are not captured correctly
    static async addCommentJiraTestCase(test: TestCase, result: TestResult) {

        const jiraUrl = jiraData.jiraUrl;
        const access_token = jiraData.access_token;
        let commentBody;
        if (result.status !== "passed") {
            // The error message contains ANSII color codes, which appears messy in Jira comment section. This need to be fixed
            // commentBody = "Error stack from automation execution below \n " + result.error?.message;
        }

        const testCaseId = test.title.split(" ")[0];
        console.log("testCaseId ", testCaseId);

        const url = `${jiraUrl}/$/${testCaseId}/comment`;

        console.log("testInfo.status isss ", result.status);

        const automationStatus = result.status == "passed" ? "Passed" : "Failed";
        const putData = {
            "body": commentBody
        }
        const response = await (await request.newContext()).post(`${url}`, {
            data: putData,
            headers: {
                "Authorization": `Basic ${access_token}`
            }
        });
        const statusWorkorder = await response.status();
        console.log("Jira comment updation API status is ", statusWorkorder);
    }



}
export default JiraBot;
