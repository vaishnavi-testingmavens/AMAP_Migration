// import { promises as fs } from "fs";
import fs from 'fs'
import path from "path";
import QuickChart from "quickchart-js";
import PerformanceDBHelper from "../helper/performanceDBHelper";

class PerformanceBot {

    /**
     * Converts combined JSON into a CSV and creates a performance chart.
     */
    static async generateCsvAndChart() {
        // Path for CSV and Chart
        const csvPath = path.join(__dirname, "../performanceArtifacts/performanceMetrics.csv");
        const chartFilePath = path.join(__dirname, "../performanceArtifacts/performance_chart.png");

        // Fetch data from DB
        const performanceDbHelper = new PerformanceDBHelper();
        await performanceDbHelper.initializeDB();
        const aggregatedData = await performanceDbHelper.fetchAggregatedData();

         // Prepare CSV data
        const csvRows = [['API Name', 'Call Count', 'Average Time', 'Min Time', 'Max Time']];

        aggregatedData.forEach((row) => {
            csvRows.push([
                row.api_name,
                row.call_count.toString(),
                row.avg_time.toFixed(2),
                row.min_time.toFixed(2),
                row.max_time.toFixed(2),
            ]);
        });
        await fs.promises.writeFile(csvPath, csvRows.map((row) => row.join(',')).join('\n'), 'utf-8');
        console.log(`CSV saved to ${csvPath}`);


        // Generate Chart
        const chart = new QuickChart();
        chart
            .setConfig({
                type: 'bar',
                data: {
                    labels: aggregatedData.map((row) => row.api_name),
                    datasets: [
                        {
                            label: 'Average Time',
                            data: aggregatedData.map((row) => row.avg_time),
                            backgroundColor: "rgba(223, 235, 54, 0.6)",
                            borderColor: "rgba(223, 235, 54, 1)",
                            borderWidth: 1,
                        },
                        {
                            label: 'Min Time',
                            data: aggregatedData.map((row) => row.min_time),
                            backgroundColor: "rgba(111, 192, 192, 0.6)",
                            borderColor: "rgba(111, 192, 192, 1)",
                            borderWidth: 1,
                        },
                        {
                            label: 'Max Time',
                            data: aggregatedData.map((row) => row.max_time),
                            backgroundColor: "rgba(255, 99, 132, 0.6)",
                            borderColor: "rgba(255, 99, 132, 1)",
                            borderWidth: 1
                        },
                    ],
                },
            })
            .setWidth(800)
            .setHeight(600);
        const chartImage = await chart.toBinary();
        await fs.promises.writeFile(chartFilePath, chartImage);
        console.log(`Chart saved to ${chartFilePath}`);
    }

}

export default PerformanceBot;