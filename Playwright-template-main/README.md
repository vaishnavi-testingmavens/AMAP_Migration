# Playwright Template Framework

Playwright Automation Framework in Typescript
=============================================

Create a new folder in your computer (E.g. C:\Automation). Open CMD/terminal from that folder (or in CMD navigate to that folder) and run the command

> git init

then
> git clone https://github.com/testingmavens/Playwright-template.git

This should download the files from the Github repository to your local. (Note: You may also read '**Branching, Commit & Merging Strategy**' at the bottom of this page, before you commit any changes)

Open VS code in your machine and from VS code open this project (File -> Open Folder -> C - Automation. There select the folder as Playwright-template)

By default, VS code will point the branch to 'main'. To access all available branches from remote (Github repository), open Terminal from vs code and then run the command

> git fetch

This should show you the list of available branches. 
Either from the terminal or from VS code UI, point to your branch (e.g. feat_arun), and if the branch is not present then create a new one if needed.


Then to install Playwright run the below command. 

> npm i

This will install the dependencies mentioned in the package.json file along with Playwright. Then to install dependent browsers run the below command

> npx playwright install --with-deps

This will install Chromium, Firefox and Webkit

Now you can test, it by running the below command

> npm test

This will run the test files which are mentioned in the 'testMatch' or 'testDir' in Playwright.config file. 
Note: If you are not seeing the browser being opened, then please change the 'headless' property in this file to 'false'.

After the run is complete, A html report will be opened on your browser.

To see Allure report, please run

> npm run test:reporter



How to Run Database Tests
=========================
This framework allows you to run automated tests directly against a PostgreSQL test database using Playwright.

✅ Prerequisite Setup for DB Testing
Before running any database-related tests, ensure the following steps are completed:

1. Install PostgreSQL Locally
Make sure you have PostgreSQL installed on your local machine. You can download it from the official site:
👉 https://www.postgresql.org/download/ (windows/mac)

2. Install and Open pgAdmin 4
pgAdmin is a graphical interface to manage your PostgreSQL databases.

After installing PostgreSQL, pgAdmin 4 is typically included by default.

Open pgAdmin 4 and ensure you can connect to your local PostgreSQL instance.
This is useful for visually verifying that the testdb and its tables (e.g., bank_accounts) are being created.

3. Match Connection Details with Environment File
Ensure that the credentials in your environment file eg., "env/.env.stage" match the configuration in your local PostgreSQL setup.

For example, these are expected in env/.env.stage:

DB_HOST=localhost
DB_PORT=5432
DB_NAME=testdb
DB_USER=postgres
DB_PASSWORD=1234

Make sure:
-> The DB_USER (e.g., postgres) and DB_PASSWORD match what you use in pgAdmin to connect
-> The testdb is accessible, or let the setup script create it during test initialization

4. Install PostgreSQL Node Client
You need the Node.js pg package to connect to PostgreSQL from your test scripts.
Run the following command in your project root:

npm install pg

This allows the framework’s helper classes to execute DB operations.

🔧 Setup Database and Sample Data (First-Time Only)
If you're running DB tests for the first time, you should set up the database, create the bank_accounts table, and insert sample data.

To do this:

1) Open the Playwright config file: playwright.config.ts

2) Uncomment the following project block in the projects array:

{
  name: "mydbSetUp",
  testMatch: /.*\SampleDB.setup\.ts/,
  retries: 1,
},

Then, inside the same file under main test project section (e.g. "Playground UI Test on Chrome"), uncomment this line:

dependencies: ["mydbSetUp"],

This ensures the database and table are automatically created before UI or DB validation tests run.

3) Once your database is set up, you can run the DB test cases directly:
npx playwright test testAssets/tests/db_examples.test.ts


After setup comment the lines uncommented in step 2 described above
These test cases use the PostgreDbHelper utility to run queries, fetch data, and assert values using test data inside your PostgreSQL database.
Environment-specific DB credentials are loaded from env/.env.stage (or whichever ENV you specify using ENV=stage, ENV=uat, etc.).