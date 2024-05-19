function cronjob() {

  //library setup 
  const cron = require('node-cron');

  var neoHQ = "60177637943-1634743268@g.us";
  var gpTikus = "120363226270078711@g.us";

  // cronjob list

  cron.schedule('* * * * *', () => {
    var message = 'This cronjob function will run every minute';
    XliconBotInc.sendMessage(
      gpTikus,
      {
        text: message,
        quoted: m,
      }
    );
    console.log(message);
  });
}

module.exports = cronjob;
