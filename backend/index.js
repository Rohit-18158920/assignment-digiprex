const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors=  require('cors');

const scheduledFunctions = require('./scheduledJob');
const config = require('./config');
const abandonedCartRoute = require('./routes/abandonedCartRoute');

const app = express();
app.use(bodyParser.json());
app.use(
   bodyParser.urlencoded({
      extended: true,
   })
);
app.use(cors());
mongoose.connect(config.moongooseConnectionURL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use('/abandonedCart',abandonedCartRoute)

app.set('port', config.port || 3000);

scheduledFunctions.initScheduledJobs();

app.get('/', (req, res) => {
   res.status(200).json({
      message: 'Hello There'
   });
});

app.listen(app.get('port'), () => {
   console.log('Express Server listening on port' + app.get('port'));
})