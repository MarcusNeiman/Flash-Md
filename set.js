const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUhja09udGsyMm5Wemt0YzRONVhiSXRvdVNOSERHZUxCOTJ3SFJSbXMwRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQXN6RUZlUFBUR0pBakxuR1JIQzM4TU5vdFVTZzdSMG1SQTVuM1IzV1IxOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxSS8wc1dGcjFuNHd1dDFhRFkreXdNbExvMSs0UEZmRWlTelhHYmpLS1hVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPUWRjcnFIajNlT3BERm1EaXFMcXQ3cU9MSGxVRERIci9RV3Jhcm85RVgwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNHMElQLzlROUlOdzF6ZXNNdDg1L0MvVE8vdm94cytYVEU2UlJNMHF3bW89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlpPcEVNWmUrbHZnc0V4blZldU1ZNlovZ1pneUlBeGpTd3dTVUo2ajZzUjg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRU1lOVQwMWh0WFBYbzBXNEIra2R2cUtFUE04ZnRxV1YxeVBsWk02Z01WZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRXdhRWRPSysxWk1nT2dPbWFVUkE3NjFFNGhmci93cCtFRmJRaERjNThSbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9oOXNrY0FwVXJkREdzQmNoTWZWUURrRGkvSEhtOEJIcDRDQ1hiZHg5eU45ZU9adDQ4M0oxU0lLMWpnUHZwWHVUWWc3Z0NCTlZwWktNc1FmbnV0VmhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU0LCJhZHZTZWNyZXRLZXkiOiJVZk8zNHJNbXJEUUtYMnQ4bXJrN0h4bU04d1ptZzhQUjVlRTA1NkVUR0RzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDcyNTY5MzMwNkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI1NkNFRDg4NUU3RDgzRDMyOUUwQzY3OUFBOTAyMTBFRCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI1NjMwMzYxfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIzRVo1a0F0SVNNNjRVV08zR0NyaF9nIiwicGhvbmVJZCI6ImNjNGM4NmM0LTcyZjItNGQzZi05NmM1LWMzNDE0ZGI2NjM4ZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5SC9JSW04NS8zUEtwSDRQb1RtdVpKR0MzRUk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYmhjaTFFM2Q5VDcycklwa3NlOU11U1laNzEwPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlJBRVAyRDlFIiwibWUiOnsiaWQiOiIyNTQ3MjU2OTMzMDY6NTNAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiTmVpbWFuIE1hcmN1cyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT0drNnRrRkVJS1A3TFlHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiUVhJQXlrU2w1cHdEaWV6eEJMclpRYnllWUdvbUNYVCtTRjM4VC9EazFoTT0iLCJhY2NvdW50U2lnbmF0dXJlIjoidnk3UU96bjlXVllKZ0tOaDlqVTdVMlozdFZEMWFXcnhNTEYvMU9DOW9kMHVIWjlrOGQzVGQ1REFhOWNtSXJxdVBBV3k4MnFzb29uU3JLWDdPWU5BQXc9PSIsImRldmljZVNpZ25hdHVyZSI6IitxTENLakthR0lnQ0Q0QWd3dkhrSDk5WS9lcTh6dlltanc3T1pDR1ZhNlhhTXJWcXQ3U2RZVm43R3BPM3lHM0ljMUNESlVUT01FZkl5MjluK0hUYWdRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzI1NjkzMzA2OjUzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlVGeUFNcEVwZWFjQTRuczhRUzYyVUc4bm1CcUpnbDAva2hkL0UvdzVOWVQifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjU2MzAzNTIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTk05In0=',
    PREFIXE: process.env.PREFIX || "$",
    OWNER_NAME: process.env.OWNER_NAME || "NEIMAN MARCUS ",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "254725693306",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
