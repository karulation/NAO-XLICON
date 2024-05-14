// cronjob.js
const cron = require('node-cron');

cron.schedule('* * * * *', () => {
  var message = 'This function will run every minute';
  var chatId = "";
  sendXliconBotIncMessage(chatId, message);
});
