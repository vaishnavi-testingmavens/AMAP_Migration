import { Client } from "pg";

/*  This class helps in setting up a sample PostgreSQL DB with some data for doing hands on for DB test cases
  If you have real PostgreSQL QA database to connnect, then you dont need this class
*/
class DbSetUp {
  // DB config
  static superUserConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT || 5432),
    database: process.env.DB_NAME, // connect to default postgres DB to create a new one
  };

  static targetDbName = "testdb";

  static async setUpDb() {
    console.log("Called setup DB");
    await this.recreateDatabaseAndTable();
    await this.createDatabase();
    await this.createBankAccountTable();
    await this.insertInitialDataIntoTable();
  }

  static async waitFor(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static async recreateDatabaseAndTable() {
    const adminClient = new Client(this.superUserConfig);

    try {
      await adminClient.connect();

      // Terminate connections to the database if it exists
      await adminClient.query(`
      SELECT pg_terminate_backend(pid)
      FROM pg_stat_activity
      WHERE datname = '${this.targetDbName}'
    `);

      // Drop the DB if exists
      await adminClient.query(`DROP DATABASE IF EXISTS ${this.targetDbName}`);
      console.log(`Dropped database '${this.targetDbName}' if it existed.`);

      // Create the DB
      await adminClient.query(`CREATE DATABASE ${this.targetDbName}`);
      console.log(`Created database '${this.targetDbName}'.`);
    } catch (err) {
      console.error("Error managing DB:", err);
    } finally {
      await adminClient.end();
    }
  }

  // Function to create the database
  private static async createDatabase() {
    console.log("Called setup DB");
    const client = new Client(this.superUserConfig);
    await client.connect();
    console.log("Called  DB");

    let res;
    try {
      res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [
        this.targetDbName,
      ]);
    } catch (error) {}

    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE ${this.targetDbName}`);
      console.log(`Database '${this.targetDbName}' created.`);
    } else {
      console.log(`Database '${this.targetDbName}' already exists.`);
    }

    await client.end();
  }

  // Function to create table in target DB
  private static async createBankAccountTable() {
    const dbClient = new Client({
      ...this.superUserConfig,
      database: this.targetDbName,
    });
    await dbClient.connect();

    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS bank_accounts (
      account_id SERIAL PRIMARY KEY,
      account_holder_name VARCHAR(100) NOT NULL,
      account_number VARCHAR(20) UNIQUE NOT NULL,
      account_type VARCHAR(50) NOT NULL,
      balance NUMERIC(12, 2) DEFAULT 0.00,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

    await dbClient.query(createTableQuery);
    console.log(`Table 'bank_accounts' created (if not already).`);
    await dbClient.end();
  }

  // Function to insert inital data into the table in target DB
  private static async insertInitialDataIntoTable() {
    const dbClient = new Client({
      ...this.superUserConfig,
      database: this.targetDbName,
    });
    await dbClient.connect();

    const insertDataQuery = `
      INSERT INTO bank_accounts (
        account_holder_name,
        account_number,
        account_type,
        balance,
        is_active
      )
      VALUES
        ('Alice Johnson', 'ACC10001', 'Savings', 10500.75, true),
        ('Bob Smith', 'ACC10002', 'Checking', 2500.00, true),
        ('Clara Lee', 'ACC10003', 'Savings', 7350.50, false),
        ('David Kumar', 'ACC10004', 'Business', 150000.00, true),
        ('Emma Watson', 'ACC10005', 'Savings', 560.25, true);
  `;

    await dbClient.query(insertDataQuery);
    console.log(`Data inserted into Table 'bank_accounts'.`);
    await dbClient.end();
  }
}
export default DbSetUp;
