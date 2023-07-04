const axios = require('axios');
const {Cars} = require('./models/models');
const sequelize = require('./db');

async function loadCarsData() {
  try {
    const response = await axios.get('https://myfakeapi.com/api/cars/');
    const carsData = response.data.cars;

    await sequelize.sync();

    for (const carData of carsData) {
      await Cars.create(carData);
    }

    console.log('Data loaded successfully!');
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

async function checkIfDataExists() {
  try {
    await sequelize.authenticate();
    const carCount = await Cars.count();

    if (carCount === 0) {
      await loadCarsData();
    } else {
      console.log('Data already exists in the database. Skipping data loading.');
    }
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

async function alterSequence() {
  try {
    const result = await Cars.findOne({
      attributes: [[sequelize.fn('max', sequelize.col('id')), 'maxId']],
    });
    const maxId = result.dataValues.maxId || 0;
    const nextId = maxId + 1;
    await sequelize.query(`ALTER SEQUENCE cars_id_seq RESTART WITH ${nextId};`);
    console.log('Sequence altered successfully!');
  } catch (error) {
    console.error('Error altering sequence:', error);
  }
}

checkIfDataExists();
alterSequence();