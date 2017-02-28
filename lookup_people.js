const pg = require('pg');
const searchFor = process.argv[2];
const settings = require('./settings'); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
});

function logSearches(result) {
  let matches = result.rows.length
    console.log('Searching ...');
    console.log(`Found ${matches} person(s) by the name ${searchFor}:`);
    for (let i = 0; i < matches; i++) {
      console.log(`- ${i + 1}: ${result.rows[i].first_name} ${result.rows[i].last_name}, born ${String(result.rows[i].birthdate).slice(0, 15)}`);
    }
}

client.connect((err) => {
  if (err) {
    return console.error('Connection Error', err);
  }
  client.query('SELECT * FROM famous_people WHERE LOWER(first_name) = $1::text OR LOWER(last_name) = $1::text', [searchFor.toLowerCase()], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    logSearches(result);
    client.end();
  });
});
