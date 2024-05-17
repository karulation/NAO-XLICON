//library setup 
const cron = require('node-cron');
const fs = require('fs');
const { google } = require('googleapis');
const dotenv = require('dotenv');
dotenv.config();
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


var neoHqID = "groupID";

// Load the data from the JSON file
const neoTeamPath = './src/data/function/neoteam.json";
let neoTeam = require(neoTeamPath);

// Function to check if a member needs to post on the current day
function checkPostDay(member) {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return member.days.includes(today);
}

// Function to run the cron job
function runCronJob() {
    cron.schedule('* * * * *', () => {
        const todayMembers = neoTeam.members.filter(member => checkPostDay(member));
        todayMembers.forEach(member => {
            if (member.total_need_to_post > 0) {
                console.log(`${member.name} needs to post today.`);
                // You can send a WhatsApp message or perform any other action here
                XliconBotInc.sendMessage(
                  neoHqID,
                  { text: `*${m.pushName}* is now AFK for: \`${text}\`` }
                );
            }
        });
    });
}

// Start the cron job
runCronJob();
