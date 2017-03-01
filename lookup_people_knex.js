const settings = require('./settings'); // settings.json
const searchFor = process.argv[2];

const knex = require('knex')({
  client: 'pg',
  connection: {
    user: 'development',
    password: 'development',
    database: 'vagrant'
  }
});

function logSearches(result) {
  let matches = result.length;
  console.log('Searching ...');
  console.log(`Found ${matches} person(s) by the name ${searchFor}:`);
  for (let i = 0; i < matches; i++) {
    console.log(`- ${i + 1}: ${result[i].first_name} ${result[i].last_name}, born ${String(result[i].birthdate).slice(0, 15)}`);
  }
}

knex.select('*')
.from('famous_people')
.where('first_name', searchFor)
.orWhere('last_name', searchFor)
.asCallback((err, result) => {
  if (err) return console.error(err);
  logSearches(result);
}).then(() => {
  knex.destroy();
});
