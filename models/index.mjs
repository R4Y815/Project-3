import { Sequelize } from 'sequelize';
import url from 'url';
import allConfig from '../config/config.js';
import undeadModel from './undead.mjs';
import comboModel from './combo.mjs';
import riderModel from './rider.mjs';
import userModel from './user.mjs';
import gameModel from './game.mjs';

const env = process.env.NODE_ENV || 'development';
const config = allConfig[env];
const db = {};
let sequelize;

// If env is production, retrieve database auth details from the
// DATABASE_URL env var that Heroku provides us
if (env === 'production') {
  // Break apart the Heroku database url and rebuild the configs we need
  const { DATABASE_URL } = process.env;
  const dbUrl = url.parse(DATABASE_URL);
  const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
  const password = dbUrl.auth.substr(dbUrl.auth.indexOf(':') + 1, dbUrl.auth.length);
  const dbName = dbUrl.path.slice(1);
  const host = dbUrl.hostname;
  const { port } = dbUrl;
  config.host = host;
  config.port = port;
  sequelize = new Sequelize(dbName, username, password, config);
}

// If env is not production, retrieve DB auth details from the config
else {
  sequelize = new Sequelize(
    config.database, 
    config.username,
    config.password,
    config);
}


// add your model definitions to db here
db.Rider = riderModel(sequelize, Sequelize.DataTypes);
db.Undead = undeadModel(sequelize, Sequelize.DataTypes);
db.Combo = comboModel(sequelize, Sequelize.DataTypes);
db.Game = gameModel(sequelize, Sequelize.DataTypes);
db.User = userModel(sequelize, Sequelize.DataTypes);



/* Define many to many relationship here */
/* db.Game.belongsToMany(db.User, { through: 'gameusers' });
db.User.belongsToMany(db.Game, { through: 'gameusers' });
 */


db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;