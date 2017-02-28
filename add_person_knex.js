const settings = require('./settings'); // settings.json
const searchFor = process.argv.slice(2);

const knex = require('knex')({
  client: 'pg',
  connection: {
    user: 'development',
    password: 'development',
    database: 'vagrant'
  }
});

knex('famous_people')
.insert({first_name: searchFor[0], last_name: searchFor[1], birthdate: searchFor[2]})
.asCallback((err, result) => {
  if (err) return console.error(err);
console.log(result);
}).then(() => {
  knex.destroy();
});
