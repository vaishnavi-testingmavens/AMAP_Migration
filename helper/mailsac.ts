import { expect, request } from "@playwright/test";

export default class Mailsac {
  static async waitForMessage(mailbox: string) {
    const timeout = 180000;
    const startTime = Date.now(); // Record the start time
    // let count = 0;
    const context = await request.newContext();
    let response;
    try {
      // Poll until the count is greater than 0
      while (true) {
        if (Date.now() - startTime > timeout) {
          throw new Error("Timeout reached while waiting for the message");
        }
        response = await context.get(
          `https://mailsac.com/api/addresses/${mailbox}/message-count`
        );
        const data = await response.json();
        const count = data.count;
        console.log("Message waiting:", data);
        // If the message count is greater than 0, break out of the loop
        if (count > 0) {
          console.log("Message received:", data);
          break;
        }

        // Wait for a short interval (e.g., 1 second) before polling again
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (error) {
      // Handle any errors that occur, including the timeout error
      console.error("An error occurred:", error.message);
    } finally {
      // Dispose of the request context
      await context.dispose();
    }
  }

  static async getLinkFromMessage(mailbox: string) {
    const context = await request.newContext();
    let response;
    try {
      response = await context.get(
        `https://mailsac.com/api/addresses/${mailbox}/messages`
      );
      if (response.ok()) {
        const responseBody = await response.json();
        const link = responseBody[0].links[0];
        console.log("Link:", link);
        return link;
      } else {
        console.error("Request failed with status:", response.status());
      }
    } finally {
      // Dispose of the request context
      await context.dispose();
    }
    return null;
  }

}
