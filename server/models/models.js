const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Cars = sequelize.define('car', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    car: {type: DataTypes.STRING},
    car_model: {type: DataTypes.STRING},
    car_color: {type: DataTypes.STRING},
    car_model_year: {type: DataTypes.INTEGER},
    car_vin: {type: DataTypes.STRING},
    price: {type: DataTypes.STRING},
    availability: {type: DataTypes.BOOLEAN}
})

module.exports = {Cars}