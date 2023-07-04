const {Sequelize} = require('sequelize');

// module.exports = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//         dialect: 'postgres',
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT
//     }
// );
module.exports = new Sequelize(
    process.env.POSTGRES_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false 
      }
    }
  }
);

//POSTGRES_URL=postgres://default:LwCkxq5IVS9T@ep-cool-sun-814630-pooler.eu-central-1.postgres.vercel-storage.com:5432/verceldb