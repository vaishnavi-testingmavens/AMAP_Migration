import { expect, request, test } from "@playwright/test";
import fs from "fs";
import path from "path";
import * as apiCodes from "../testAssets/test-data/apiCodes.json";
import TokenManager from "./TokenManager";
import PerformanceDBHelper from "./performanceDBHelper";
import { env } from "process";

class ApiRequests {
  static async getAPI(endpoint, statusAndFormatCheck = true, token?: string) {
    const access_token = token || (await TokenManager.loadAuthToken());
    console.log(`access_token for the ${endpoint} is ${access_token}`);
    const before = performance.now();
    const response = await (
      await request.newContext()
    ).get(`${env.apiBaseUrl}${endpoint}`, {
      headers: {
        "X-Secondary-Auth": `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });
    const after = performance.now();
    const timeTaken = after - before;
    const testName = test.info().title;
    const performanceDBHelper = new PerformanceDBHelper();
    await performanceDBHelper.insertPerformanceData(
      endpoint,
      timeTaken,
      testName,
      "get"
    );
    await performanceDBHelper.closeDB();

    const statusCode = response.status();
    const statusText = response.statusText();

    console.log(
      `Time taken for ${endpoint} - GET API call is ${timeTaken}, the status code is ${statusCode} and \n statusText is:: ${statusText}`
    );

    if (statusAndFormatCheck) {
      expect(statusCode, "Status code should be").toBe(
        apiCodes.getStatusCodePass
      );
      expect(statusText, "Status text should be").toBe(
        apiCodes.getStatusTextPass
      );
    }

    // Verify that the content type and response body is JSON
    if (statusAndFormatCheck) {
      // Validate that the 'Content-Type' header has the expected value
      const contentTypeHeader: string | undefined =
        response.headers()["content-type"];
      expect(contentTypeHeader, "Content type should be").toBeDefined();
      expect(contentTypeHeader, "Content type should contain").toContain(
        "application/json"
      );

      // Validate that the response body is Parsed JSON using Jest
      const responseBodyBuffer = await response.body(); // Get the response body as a Buffer
      const responseBody = responseBodyBuffer.toString("utf-8"); // Convert Buffer to a UTF-8 encoded string
      const responseJson: object = JSON.parse(responseBody); // Parse the string as JSON

      // Expectations for the Parsed JSON
      expect(responseJson, "Response should be a valid JSON").toBeDefined();
      expect(responseJson, "Response should be an object").toBeInstanceOf(
        Object
      );
    }

    console.log("responseBody is.. ", response);

    return [response, timeTaken];
  }

  static async postAPI(
    endpoint,
    body?: object,
    statusAndFormatCheck = true,
    token?: string
  ) {
    const access_token = token || (await TokenManager.loadAuthToken());
    console.log(`access_token for the ${endpoint} is ${access_token}`);
    const before = performance.now();
    const response = await (
      await request.newContext()
    ).post(`${env.apiBaseUrl}${endpoint}`, {
      data: body,
      headers: {
        "X-Secondary-Auth": `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });
    const after = performance.now();
    const timeTaken = after - before;

    // Log performance data to SQLite
    const testName = test.info().title;
    const performanceDBHelper = new PerformanceDBHelper();
    await performanceDBHelper.insertPerformanceData(
      endpoint,
      timeTaken,
      testName,
      "post"
    );
    await performanceDBHelper.closeDB();

    const statusCode = response.status();
    const statusText = response.statusText();
    console.log(
      `Time taken for ${endpoint} - POST API call is ${timeTaken} and the status code is ${statusCode}`
    );
    if (statusAndFormatCheck) {
      expect(statusCode, "Status code should be").toBe(
        apiCodes.postStatusCodePass
      );
      expect(statusText, "Status text should be ").toBe(
        apiCodes.postStatusTextPass
      );
    }

    if (statusAndFormatCheck) {
      const contentTypeHeader: string | undefined =
        response.headers()["content-type"];
      expect(contentTypeHeader, "Content type should be").toBeDefined();
      expect(contentTypeHeader, "Content type should contain").toContain(
        "application/json"
      );

      const responseBodyBuffer = await response.body();
      const responseBody = responseBodyBuffer.toString("utf-8");
      const responseJson: object = JSON.parse(responseBody);

      expect(responseJson, "Response should be a valid JSON").toBeDefined();
      expect(responseJson, "Response should be an object").toBeInstanceOf(
        Object
      );
    }

    return [response, timeTaken];
  }

  static async putAPI(
    endpoint,
    body?: object,
    statusAndFormatCheck = true,
    token?: string
  ) {
    const access_token = token || (await TokenManager.loadAuthToken());
    console.log(`access_token for the ${endpoint} is ${access_token}`);
    const before = performance.now();
    const response = await (
      await request.newContext()
    ).put(`${env.apiBaseUrl}${endpoint}`, {
      data: body,
      headers: {
        "X-Secondary-Auth": `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });
    const after = performance.now();
    const timeTaken = after - before;

    //  await PerformanceLogger.logResponseTime(endpoint, "get", timeTaken);

    // Log performance data to SQLite
    const testName = test.info().title;
    const performanceDBHelper = new PerformanceDBHelper();
    await performanceDBHelper.insertPerformanceData(
      endpoint,
      timeTaken,
      testName,
      "put"
    );
    await performanceDBHelper.closeDB();

    const statusCode = response.status();
    const statusText = response.statusText();
    console.log(
      `Time taken for ${endpoint} - PUT API call is ${timeTaken} and the status code is ${statusCode}`
    );
    if (statusAndFormatCheck) {
      expect(statusCode, "Status code should be").toBe(
        apiCodes.putStatusCodePass
      );
      expect(statusText, "Status text should be").toBe(
        apiCodes.putStatusTextPass
      );
    }

    if (statusAndFormatCheck) {
      const contentTypeHeader: string | undefined =
        response.headers()["content-type"];
      expect(contentTypeHeader, "Content type should be").toBeDefined();
      expect(contentTypeHeader, "Content type should contain").toContain(
        "application/json"
      );

      const responseBodyBuffer = await response.body();
      const responseBody = responseBodyBuffer.toString("utf-8");
      const responseJson: object = JSON.parse(responseBody);

      expect(responseJson, "Response should be a valid JSON").toBeDefined();
      expect(responseJson, "Response should be an object").toBeInstanceOf(
        Object
      );
    }

    return [response, timeTaken];
  }

  static async deleteAPI(
    endpoint,
    statusAndFormatCheck = true,
    token?: string
  ) {
    const access_token = token || (await TokenManager.loadAuthToken());
    console.log(`access_token for the ${endpoint} is ${access_token}`);
    const before = performance.now();
    const response = await (
      await request.newContext()
    ).delete(`${env.apiBaseUrl}${endpoint}`, {
      headers: {
        "X-Secondary-Auth": `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });
    const after = performance.now();
    const timeTaken = after - before;
    // await PerformanceLogger.logResponseTime(endpoint, "delete", timeTaken)

    // Log performance data to SQLite
    const testName = test.info().title;
    const performanceDBHelper = new PerformanceDBHelper();
    await performanceDBHelper.insertPerformanceData(
      endpoint,
      timeTaken,
      testName,
      "delete"
    );
    await performanceDBHelper.closeDB();

    const statusCode = response.status();
    const statusText = response.statusText();
    console.log(
      `Time taken for ${endpoint} - DELETE API call is ${timeTaken} and the status code is ${statusCode}`
    );

    if (statusAndFormatCheck) {
      expect(statusCode, "Status code should be").toBe(
        apiCodes.deleteStatusCodePass
      );
      expect(statusText, "Status text should be").toBe(
        apiCodes.deleteStatusTextPass
      );
    }

    if (statusAndFormatCheck) {
      const contentTypeHeader: string | undefined =
        response.headers()["content-type"];
      expect(contentTypeHeader, "Content type should be").toBeDefined();
      expect(contentTypeHeader, "Content type should contain").toContain(
        "application/json"
      );

      const responseBodyBuffer = await response.body();
      const responseBody = responseBodyBuffer.toString("utf-8");
      const responseJson: object = JSON.parse(responseBody);

      expect(responseJson, "Response should be a valid JSON").toBeDefined();
      expect(responseJson, "Response should be an object").toBeInstanceOf(
        Object
      );
    }

    return [response, timeTaken];
  }

  static async documentPostAPI(
    endpoint: string,
    body: object,
    filePath?: string,
    statusAndFormatCheck = true
  ) {
    const access_token = await TokenManager.loadAuthToken();
    console.log(`access_token for the ${endpoint} is ${access_token}`);
    const before = performance.now();

    const context = await request.newContext();

    let response;
    if (filePath) {
      // Read file content into a buffer
      const fileBuffer = fs.readFileSync(filePath);
      const fileName = path.basename(filePath);

      // Construct multipart data
      const multipartData = {
        "documents[file]": {
          name: fileName,
          mimeType: "application/pdf",
          buffer: fileBuffer,
        },
      };

      // Append attributes from body to multipartData
      Object.keys(body).forEach((key) => {
        if (key !== "file") {
          multipartData[`documents[${key}]`] = body[key];
        }
      });

      // Send multipart POST request
      response = await context.post(`${env.apiBaseUrl}${endpoint}`, {
        multipart: multipartData,
        headers: {
          "X-Secondary-Auth": `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      });
    } else {
      // Send regular JSON POST request if no file path provided
      response = await context.post(`${env.apiBaseUrl}${endpoint}`, {
        data: body,
        headers: {
          "X-Secondary-Auth": `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      });
    }

    const after = performance.now();
    const timeTaken = after - before;
    // await PerformanceLogger.logResponseTime(endpoint, "post", timeTaken)

    // Log performance data to SQLite
    const testName = test.info().title;
    const performanceDBHelper = new PerformanceDBHelper();
    await performanceDBHelper.insertPerformanceData(
      endpoint,
      timeTaken,
      testName,
      "post"
    );
    await performanceDBHelper.closeDB();

    // Validate response status and format if needed
    const statusCode = response.status();
    const statusText = response.statusText();
    console.log(
      `Time taken for ${endpoint} - DOCUMENT_POST API call is ${timeTaken} and the status code is ${statusCode}`
    );
    if (statusAndFormatCheck) {
      expect(statusCode, "Status code should be").toBe(
        apiCodes.postStatusCodePass
      );
      expect(statusText, "Status text should be ").toBe(
        apiCodes.postStatusTextPass
      );
    }

    // Check response content type
    if (statusAndFormatCheck) {
      const contentTypeHeader: string | undefined =
        response.headers()["content-type"];
      expect(contentTypeHeader, "Content type should be").toBeDefined();
      expect(contentTypeHeader, "Content type should contain").toContain(
        "application/json"
      );
    }

    // Parse response body
    const responseBodyBuffer = await response.body();
    const responseBody = responseBodyBuffer.toString("utf-8");
    const responseJson: object = JSON.parse(responseBody);

    // Validate JSON response structure if needed
    if (statusAndFormatCheck) {
      expect(responseJson, "Response should be a valid JSON").toBeDefined();
      expect(responseJson, "Response should be an object").toBeInstanceOf(
        Object
      );
    }

    // Dispose of Playwright context
    await context.dispose();

    return [responseJson, timeTaken, response];
  }
}

export const getAPI = ApiRequests.getAPI;
export const postAPI = ApiRequests.postAPI;
export const putAPI = ApiRequests.putAPI;
export const deleteAPI = ApiRequests.deleteAPI;
export const documentPostAPI = ApiRequests.documentPostAPI;
