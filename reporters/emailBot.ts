import { request } from '@playwright/test';
import { TestCase, TestResult } from '@playwright/test/reporter';
import * as nodemailer from 'nodemailer'



class EmailBot {

    static async sendEmail(executionResult: string): Promise<void> {
        // Replace the placeholders with your Gmail account details
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'your-email@gmail.com',
            pass: 'your-password',
          },
        });
      
        const mailOptions: nodemailer.SendMailOptions = {
          from: 'your-email@gmail.com',
          to: 'recipient-email@example.com',
          subject: 'Playwright Execution Result',
          text: `Playwright script execution result: ${executionResult}`,
        };
      
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error.message);
          } else {
            console.log('Email sent:', info.response);
          }
        });
      }
    
    static async sendExecutionResultByEmailsendEmail(executionResult): Promise<void> {
        // Replace the placeholders with your Microsoft 365 email account details
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'testingmavensreporter@gmail.com',
                pass: 'Arun@2020',
            },
        });

        const mailOptions: nodemailer.SendMailOptions = {
            from: 'testingmavensreporter@gmail.com',
            to: 'arundev.nair@testingmavens.com',
            subject: 'Playwright Execution Result',
            text: `Playwright script execution result: ${executionResult}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error.message);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    }

    static async millisecondsToMinutesAndSeconds(milliseconds: number) {
      const totalSeconds = Math.round(milliseconds / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      const time = minutes+'min '+seconds+' sec'
      return time;
  }

}
export default EmailBot;
