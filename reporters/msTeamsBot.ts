import { request } from '@playwright/test';
import { FullResult } from '@playwright/test/reporter';
import DateTime from '../helper/dateTime';



class MsTeamsBot {


    static async sendSummaryNotificationToTeams(summary: Map<string, any>, result: FullResult, mapResult: Map<string, string>) {
        const webhookUrl = process.env.TEAMS_WEBHOOK_URL;
        const suiteDuration = DateTime.millisecondsToHoursAndMinutes(result.duration);
        const message = {
            "@type": "MessageCard",
            "@context": "http://schema.org/extensions",
            "summary": "Test Summary - API",
            "sections": [{
                "activityTitle": "API Execution summary at " + DateTime.getDateNow(),
                "facts": Array.from(summary).map(([key, value]) => ({ name: key, value: value }))
            },
            {
                "activityTitle": "Detailed Test Results for API",
                "facts": Array.from(mapResult).map(([key, value]) => ({ name: key, value: value }))
            }]
        };

        try {
            const response = await (await request.newContext()).post(`${webhookUrl}`, {
                data: message
            });
            console.log(`Sent summary message to Teams with response statusText: ${response.statusText}`);
        } catch (error) {
            console.error(`Failed to send summary message to Teams: ${error}`);
        }
    }


}
export default MsTeamsBot;
