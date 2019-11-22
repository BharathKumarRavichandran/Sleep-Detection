const fs = require('fs');
const HttpStatus = require('http-status-codes');

// Importing config/env variables
const config = require('../config/index');
const logger = require('../config/winston');

// Importing utils
const sendgridMailUtil = require('../utils/sendgridMail.util');

exports.sendAlertEmail = async (req, res) => {
    try {
        const RECIPIENT_LIST_PATH = config.files.recipientList;
        const fileContent = await fs.readFileSync(RECIPIENT_LIST_PATH,'utf8');
        const recipientList = JSON.parse(fileContent);

        // Send email for each recipient
        for(let i=0;i<recipientList.length;i++){ 
            let mailResponse = await sendgridMailUtil.sendAlertEmail(recipientList[i].email);
            if(mailResponse.status_code!=200){
                throw Error(mailResponse.message);
            }
            logger.info(`Sent alert email to ${recipientList[i].email}`);
        }
        let status_code = 200;
        return res.status(status_code).json({
            status_code: status_code,
            message: HttpStatus.getStatusText(status_code),
            data: {
            }
        });
    } catch(error){
        logger.error(error.toString());
        let status_code = 500;
        return res.status(status_code).json({
            status_code: status_code,
            message: HttpStatus.getStatusText(status_code),
            data: {}
        });
    }
}