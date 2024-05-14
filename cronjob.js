//library setup 
const { google } = require('googleapis');
const dotenv = require('dotenv');
dotenv.config();
const cron = require('node-cron');
const mysql = require('mysql');



const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

// google sheet
async function getData() {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: 'YOUR_SPREADSHEET_ID',
    range: 'Sheet1', 
  });

  const rows = response.data.values;
  if (rows.length) {
    console.log('Data:');
    rows.forEach(row => {
      console.log(row);
    });
  } else {
    console.log('No data found.');
  }
}

getData();

// mysql connection
const pool = mysql.createPool({
  host: 'your_database_host',
  user: 'your_database_user',
  password: 'your_database_password',
  database: 'your_database_name'
});


// // test select table
// pool.promise().query('SELECT * FROM your_table_name')
//   .then(([rows, fields]) => {
//     console.log('Query results:', rows);
//   })
//   .catch((err) => {
//     console.error('Error querying database:', err);
//   });
// pool.end((err) => {
//   if (err) {
//     console.error('Error closing database connection:', err);
//     return;
//   }
//   console.log('Connection pool closed successfully!');
// });



// cronjob list

cron.schedule('* * * * *', () => {
  var message = 'This function will run every minute';
  var chatId = "";
  sendXliconBotIncMessage(chatId, message);
});
