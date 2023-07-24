const { google } = require('googleapis');
const { join } = require('path');
const sheets = google.sheets('v4');


// const spreadsheetId = process.env.SHEET_ID;
const spreadsheetId = '1bB_HUM-hKM2SLwSSMW9twQMULF_5hxWDnTIGa9Al5d4';

// const credentialsPath = join(__dirname, '..', 'credentials.json');

exports.googleUpdate = async (req,res) =>{
  const authClient = await authorize();
  let resources = [
    "EXECUTED data",
    "EXECUTED data",
    "EXECUTED data",
  ]
  const request = {
    
    spreadsheetId: spreadsheetId,
    range: 'Sheet1!A1',
    valueInputOption: 'USER_ENTERED',
    resource: {values:[resources]},
    auth: authClient,
  };

  try {
    const response = (await sheets.spreadsheets.values.append(request)).data;
    console.log(JSON.stringify(response, null, 2));
    res.send(JSON.stringify(response, null, 2))
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message:'не вдалося дані в таблицю'
    })
  }
}


async function authorize() {

  let authClient = new google.auth.GoogleAuth({
    keyFile:"credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
  });;

  if (authClient == null) {
    throw Error('authentication failed');
  }
  return authClient;
}
