const fs = require('fs');
const HttpStatus = require('http-status-codes');
const logger = require('../config/winston');
const path = require('path');
const sgMail = require('@sendgrid/mail');

// Importing configuration/env variables
const config = require('../config/index');

// Setting Sendgrid API key
sgMail.setApiKey(config.key.SENDGRID_API_KEY);

exports.sendAlertEmail = async (toEmail) => {
    try {
        const message = {
            from: config.email.SITE_NOREPLY_EMAIL,
            to: toEmail,
            subject: 'Alert - Sleep Detection',
            html: `
                <div>
                    <div>Hello,</div>
                    <br/>
                    <div><b>EMERGENCY ALERT:</b> Someone is sleeping while driving.</div>
                    <br/>
                    <div>Regards,</div>
                    <div>Team Sleep Detector</div>
                </div>
            `,
        };
        let mail = await sgMail.send(message);
        let status_code = 200;
        return {
            status_code: status_code,
            message: HttpStatus.getStatusText(status_code),
            data: {}
        }
    } catch(error){
        logger.error(error.toString());
        let status_code = 500;
        return {
            status_code: status_code,
            message: error.toString(),
            data: {}
        }
    }
}
