const CronJob = require('node-cron');
const sendEmail = require('./services/sendEmailUpdateTable'); 

exports.initScheduledJobs = () => {
    const scheduledJobFunction = CronJob.schedule('* * * * *', () => {
        console.log('running a task every minute');
        sendEmail.sendEmailUpdateTable();
        
     });
     scheduledJobFunction.start();
}