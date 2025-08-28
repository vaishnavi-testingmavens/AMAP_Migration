import { promises as fs } from 'fs';
import path from 'path';

export default class PerformanceLogger {
  private static filePath = path.join(__dirname, '../performanceArtifacts/performanceMetrics.json');
  private static tempFilePath = path.join(__dirname, '../performanceArtifacts/performanceMetrics.tmp.json');

  /**
   * Logs the response time into a JSON file, ensuring atomic writes to prevent race conditions.
   * @param endPointOriginal The original endpoint name.
   * @param requestMethod The HTTP request method.
   * @param timeTaken The time taken for the API call.
   */
  static async logResponseTime(endPointOriginal: string, requestMethod: string, timeTaken: number) {
    const dirPath = path.join(__dirname, '../performanceArtifacts');

    // Ensure the performanceArtifacts directory exists
    try {
      await fs.mkdir(dirPath, { recursive: true });
    } catch (error) {
      console.error("Error creating directory:", error);
      return;
    }

    let retries = 5; // Max retry attempts
    while (retries > 0) {
      try {
        // Read the current data or initialize an empty object
        let performanceData: any = {};
        try {
          const jsonData = await fs.readFile(this.filePath, 'utf-8');
          performanceData = JSON.parse(jsonData);
        } catch (readError) {
          if (readError.code !== 'ENOENT') {
            throw readError; // Fail if the error isn't "file not found"
          }
        }

        // Extract and format the endpoint
        const regex = /^\/api\/ev1\/(\w+)/;
        const match = endPointOriginal.match(regex);
        let endPoint = match ? match[1] : endPointOriginal;
        endPoint = `${endPoint}::${requestMethod}`;
        console.log("Endpoint trimmed as:", endPoint);
        
        // Initialize the endpoint entry if it doesn't exist
        if (!performanceData[endPoint]) {
          performanceData[endPoint] = { timeTaken: [] };
        }

        // Append the timeTaken to the array
        performanceData[endPoint].timeTaken.push(timeTaken);

        // Write to a temporary file first
        await fs.writeFile(this.tempFilePath, JSON.stringify(performanceData, null, 2), 'utf-8');

        // Atomically rename the temp file to the actual file
        await fs.rename(this.tempFilePath, this.filePath);

        console.log("Performance data updated successfully.");
        return; // Exit successfully
      } catch (error) {
        console.error("Error updating performance data, retrying...", error);
        retries--;
        await this.sleep(100); // Wait briefly before retrying
      }
    }

    console.error("Failed to update performance data after multiple attempts.");
  }

  /**
   * Utility function to sleep for a given number of milliseconds.
   * @param ms Time to sleep in milliseconds.
   */
  private static sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  
}
