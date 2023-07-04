const {Cars} = require('../models/models');
const ApiError = require('../error/ApiError');

class CarsController {
    async create(req, res, next) {
        try {
            const {car, car_model, car_color, car_model_year, car_vin, price, availability} = req.body;
            const newCar = await Cars.create({car, car_model, car_color, car_model_year, car_vin, price, availability});
            return res.json(newCar);
        } catch (e) {
             next(ApiError.badRequest(e.message));
        }
    }
    async getAll(req, res) {
        const {id} =req.query;
        let car;
        if (!id) {
            car = await Cars.findAll();
        } else {
            car = await Cars.findAll({where: {id}});
        }
        return res.json(car);
    }
    async change(req, res, next) {
        try {
          const { id } = req.body;
          const { car, car_model, car_color, car_model_year, car_vin, price, availability } = req.body;
          const updatedCar = await Cars.update(
            { car, car_model, car_color, car_model_year, car_vin, price, availability },
            { where: { id } }
          );
          if (updatedCar[0] === 0) {
            throw new Error('Car not found');
          }
          const changedCar = await Cars.findByPk(id);
          return res.json(changedCar);
        } catch (e) {
          next(ApiError.badRequest(e.message));
        }
      }
    async delete(req, res, next) {
        try {
          const { id } = req.query;
          const deletedCar = await Cars.destroy({ where: { id } });
          if (deletedCar === 0) {
            throw new Error('Car not found');
          }
          return res.json({ message: 'Car deleted successfully' });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
      }
    async getlastCreatedCar(req, res) {
      const lastCar = await Cars.findOne({
        order: [['createdAt', 'DESC']],
      });
      if (lastCar) {
          return res.json(lastCar);
      } else {
          return res.status(404).json({ message: 'Car not found' });
      }
    }
}

module.exports = new CarsController();