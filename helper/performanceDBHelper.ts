import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

class PerformanceDBHelper {
  private dbFile = path.join(__dirname, '../performanceArtifacts/performance.db');
  private db: Database.Database;
  private isInitialized = false; // Tracks if initialization is complete

  constructor() {
    console.log("DB object created");
    // this.initializeDB();
  }

  /**
   * Initializes the SQLite database.
   */
  async initializeDB() {
    if (await this.isInitialized) {
      return; // Prevent duplicate initialization
    }

    // Ensure the directory exists
    const dir = await path.dirname(this.dbFile);
    if (!fs.existsSync(dir)) {
      await fs.mkdirSync(dir, { recursive: true });
    }

    // Initialize the SQLite database
    if (!this.db) {
      this.db = await new Database(this.dbFile);
      console.log(`Database initialized at ${this.dbFile}`);
    }

    // Create a table to store API performance data
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS performance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        api_name TEXT NOT NULL,
        time_taken REAL NOT NULL,
        test_name TEXT NOT NULL
      );
    `);

    this.isInitialized = true; // Mark as initialized
  }

  /**
   * Ensures the database is initialized before any operation.
   */
  private async ensureDBInitialized() {
    if (!this.isInitialized || !this.db) {
      //   throw new Error('Database is not initialized. Call initializeDB() before performing any operations.');
      await this.initializeDB();
    }
  }

  /**
   * Inserts performance data into the database.
   * @param apiName API name
   * @param timeTaken Time taken for the API call
   * @param testName Test name
   */
  async insertPerformanceData(apiName: string, timeTaken: number, testName: string, requestMethod: string) {

    let endPoint: string;

    // Sequentially check regex patterns and process them
    if (/^\/api\/ev1\/[^?]+\?/.test(apiName)) {
      // Match APIs with a '?' (filters)
      const match = apiName.match(/^\/api\/ev1\/[^?]+\?/);
      const base = match![0].split("?")[0];
      endPoint = `${base}::${requestMethod}`;
    } else if (/^\/api\/ev1\/[^\/]+\/(\d+\/?)+\/[^\/]+\/(\d+\/?)+/.test(apiName)) {
      // Match APIs with two sets of IDs and a final segment
      const match = apiName.match(/^\/api\/ev1\/[^\/]+\/(\d+\/?)+\/[^\/]+\/(\d+\/?)+/);
      const endPointArr = match![0].split(/\/(\d+\/?)+/);
      endPoint = `${endPointArr[0]}/{id}/${endPointArr[2]}/{status_id}::${requestMethod}`;
    } else if (/^\/api\/ev1\/[^\/]+\/(\d+\/?)+\/[^\/]+/.test(apiName)) {
      // Match APIs with one set of ID and a final segment
      const match = apiName.match(/^\/api\/ev1\/[^\/]+\/(\d+\/?)+\/[^\/]+/);
      const endPointArr = match![0].split(/\/(\d+\/?)+/);
      endPoint = `${endPointArr[0]}/{id}/${endPointArr[2]}::${requestMethod}`;
    } else if (/^\/api\/ev1\/[^\/]+\/(\d+\/?)+/.test(apiName)) {
      // Match APIs with one set of ID only
      const match = apiName.match(/^\/api\/ev1\/[^\/]+\/(\d+\/?)+/);
      const endPointArr = match![0].split(/\/(\d+\/?)+/);
      endPoint = `${endPointArr[0]}/{id}::${requestMethod}`;
    } else {
      // Default case: log the API as is
      endPoint = `${apiName}::${requestMethod}`;
    }
    // console.log("endPoint after trim is ", endPoint);
    
    await this.ensureDBInitialized();
    const stmt = await this.db!.prepare(
      'INSERT INTO performance (api_name, time_taken, test_name) VALUES (?, ?, ?)'
    );
    await stmt.run(endPoint, timeTaken, testName);
  }

  /**
   * Fetches aggregated performance data from the database.
   * @returns Aggregated data
   */
  async fetchAggregatedData() {
    const stmt = await this.db!.prepare(`
      SELECT 
        api_name,
        COUNT(*) AS call_count,
        AVG(time_taken) AS avg_time,
        MIN(time_taken) AS min_time,
        MAX(time_taken) AS max_time
      FROM performance
      GROUP BY api_name;
    `);
    return stmt.all();
  }

  /**
   * Closes the database connection.
   */
  async closeDB() {
    if (this.db) {
      await this.db.close();
      this.db = null;
      this.isInitialized = false; // Reset initialization state
      console.log('Database connection closed.');
    }
  }
}

export default PerformanceDBHelper;
