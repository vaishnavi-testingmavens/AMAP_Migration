import { Client } from "pg";

export class PostgreDbHelper {
  static dbConfig = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  };

  private static async executeQuery(queryToExecute: String) {
    const client = new Client(this.dbConfig);
  
    // Log the config to verify ENV values
    console.log("🛠️ Connecting with DB config:", this.dbConfig);
  
    try {
      await client.connect();
      console.log("✅ Connected to DB");
  
      console.log("📥 Running query:", queryToExecute);
      const result = await client.query(queryToExecute);
      console.log("✅ Query result:", result);
      return result;
    } catch (error) {
      console.error("❌ Error during DB operation:", error.message);
      return null;
    } finally {
      await client.end();
    }
  }

  static async insertData(queryToExecute: String) {
    const result = await this.executeQuery(queryToExecute);
    const success = result.rowCount > 0 ? true : false;
    // console.log("resultArray ", resultArray);
    return success;
  }

  static async queryForResultArray(queryToExecute: String) {
    const result = await this.executeQuery(queryToExecute);
    const resultArray = result.rows;
    // console.log("resultArray ", resultArray);
    return resultArray;
  }
  static async queryForResultObject(queryToExecute: String) {
    const result = await this.executeQuery(queryToExecute);
    const resultObject = result.rows[0];
    // console.log("resultObject ", resultObject);
    return resultObject;
  }

  static async queryForResultItemValue(
    queryToExecute: String,
    columnName: String
  ) {
    const result = await this.executeQuery(queryToExecute);
    const resultItem = result.rows[0];
    const val = resultItem[columnName];
    console.log("resultitem ", resultItem);
    return val;
  }
}
