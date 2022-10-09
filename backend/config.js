const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT,
    moongooseConnectionURL: process.env.MONGODB_CONNECT_URL,
    emailServiceProvider: process.env.EMAIL_SERVICE_PROVIDER,
    emailConnectionUsername: process.env.EMAIL_USERNAME,
    emailConnectionPassword: process.env.EMAIL_PASSWORD,
    adminEmailAddress: process.env.SENDER_EMAIL,
    firstScheduleTimer: process.env.FIRST_SCHEDULE,
    secondScheduleTimer: process.env.SECOND_SCHEDULE,
    thirdScheduleTimer: process.env.THIRD_SCHEDULE,
  };