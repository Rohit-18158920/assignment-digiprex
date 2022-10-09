# assignment-digiprex

- ## Initial Setup
  - Please add configuration in backend/.env file and frontend/src/config.js (for url of backend api)
  - Run npm install on frontend and backend folder.
  - Run npm start from both frontend and backend folder.
 
- ## Backend Service
  Contains the apis for abandoned cart information along with the cron job which keeps checking every minute in database if there are any reminders to be sent to users.
- ## Apis
  - /addData
    Adds data to the database related to abandoned cart post validation of the request body.
  - /getDetails
    fetch information from database related to abandoned cart to be used in frontend application to show in data table.
  - /updateCompletionStatus
    Once user places the order the completed flag is set to true for the cart token.
## Information related to request and response can be found in the [this](https://docs.google.com/document/d/1BhInt8ftw1E6vUyVbdnFkmKJqaY58Q2G-eZm73M6zEk/edit?usp=sharing) googleDoc.

- ## Frontend Service
    The frontend applciation just retrieves the information related to the abandoned cart and displays then in a data table. It has few addition features like filter and pagination, view order info by clicking the order info field.

### Please Note the api call to update completion status has been set as get call since there was no UI for the website, once customer hits the link the update status api call will be invoked from device which is always a get call.
