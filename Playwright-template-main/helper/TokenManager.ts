import { request } from "playwright";
import { expect } from "playwright/test";
import * as env from "../testAssets/test-data/env-waits.json";
import fs from "fs";
import { setTimeout } from "timers/promises";
import Random from "./random";

export default class TokenManager {
  private static authToken: string | null = null;
  private static tokenGenerationCounter = 0;
  private static tokenFile = "auth-token.json";

  public static async loadAuthToken(): Promise<string> {
    if (TokenManager.authToken) {
      return TokenManager.authToken;
    }
    console.log(
      "Token was not loaded earlier and trying to read from the auth token file"
    );
    try {
      const responseBody = await fs.readFileSync(
        TokenManager.tokenFile,
        "utf-8"
      );
      const tokenData = await JSON.parse(responseBody);
      TokenManager.authToken = tokenData.access_token;
      let attempt = 1;
      while (!TokenManager.authToken && attempt <= 3) {
        console.log("Token not found, hence generating new token...");
        const timeOutSec = Random.getRandomNumber(100, 3000);
        await setTimeout(timeOutSec);
        TokenManager.authToken = await this.generateAuthToken();
        attempt++;
      }
      if (!TokenManager.authToken) {
        throw new Error("Token generation failed after 3 attempts");
      } else {
        return TokenManager.authToken;
      }
    } catch (error) {
      console.log(
        "Error: Token was not found in the auth token file, generating the token by calling API"
      );
      TokenManager.authToken = await this.generateAuthToken();
    }
    console.log("access_token is ", TokenManager.authToken);
    return TokenManager.authToken;
  }

  public static getAuthToken(): string | null {
    return TokenManager.authToken;
  }

  public static async loadInvalidAuthToken(): Promise<string> {
    // Load the invalid auth token
    const invalidAuthToken = await fetchInvalidAuthToken();
    return invalidAuthToken;
  }

  static async generateAuthToken(): Promise<string> {
    console.log(
      "Token generation attempt count: ",
      ++TokenManager.tokenGenerationCounter
    );

    let authResponse = await (
      await request.newContext()
    ).post(`${process.env.apiBaseUrl}/api/auth/login`, {
      data: {
        email: process.env.emailAddress,
        password: process.env.ecommercePassword,
      },
    });
    let authResponseBody;
    try {
      expect(authResponse.status()).toBe(200);
      authResponseBody = await authResponse.json();
    } catch (error) {
      authResponse = await (
        await request.newContext()
      ).post(`${process.env.apiBaseUrl}/api/auth/login`, {
        data: {
          email: process.env.emailAddress,
          password: process.env.ecommercePassword,
        },
      });
      authResponseBody = await authResponse.json();
    }
    console.log(await authResponse.json());
    const access_token = await authResponseBody.token;
    await fs.writeFileSync(
      TokenManager.tokenFile,
      JSON.stringify({ access_token })
    );
    return access_token;
  }
}

async function fetchInvalidAuthToken() {
  const authResponse = await (
    await request.newContext()
  ).post(`${process.env.apiBaseUrl}/api/auth/login`, {
    data: { email: "invalidUser@example.com", password: "XYZABC" },
  });
  let authResponseBody;
  try {
    expect(
      authResponse.status(),
      "Expecting status code 401 for invalid credentials"
    ).toBe(401);
    expect(
      authResponse.statusText(),
      "Expecting status text unauthorized for invalid credentials"
    ).toBe("Unauthorized");
    authResponseBody = await authResponse.json();
  } catch (error) {
    console.log("Failed to fetch invalid auth token: ", error);
  }
  return authResponseBody;
}
