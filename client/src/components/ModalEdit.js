import {useDispatch, useSelector} from 'react-redux';
import { useState , useEffect} from 'react';
import axios from 'axios';

function useUpdateCars(formData) {
    const dispatch = useDispatch();
    const filtredCars = useSelector(state => state.filtredCars);
    const cars = useSelector(state => state.cars);
    const updateCars = () => {
        const updatedFiltredCars = filtredCars.map(car => {
            if (car.id === formData.id) {
              return formData;
            }
            return car;
          });
        dispatch({ type: 'FILTERED_CARS', filter: updatedFiltredCars });
        const updatedCars = cars.map(car => {
            if (car.id === formData.id) {
              return formData;
            }
            return car;
          });
        dispatch({ type: 'ALL_CARS', setAll: updatedCars });
    };
    return updateCars;
}

export default function ModalEdit({active, src}) {
    const dispatch = useDispatch()
    const modalContent = useSelector(state => state.modalContent)
    const [formData, setFormData] = useState({
        id: '',
        car: 'NOT FOUND',
        car_model: '',
        car_color: '',
        car_model_year: 0,
        car_vin: '',
        price: '$0',
        availability: false,
    });
    useEffect(() => {
        setFormData({
          id: modalContent.id,
          car: modalContent.car,
          car_model: modalContent.car_model,
          car_color: modalContent.car_color,
          car_model_year: modalContent.car_model_year,
          car_vin: modalContent.car_vin,
          price: modalContent.price,
          availability: modalContent.availability,
        });
      }, [modalContent]);
    const updateCars = useUpdateCars(formData);
    const updateModalEdit = (name, value) => {
        dispatch({type: "CHANGE_CAR", change: {...modalContent, [name]: value}})
    }
    const closeModalEdit = () => {
        dispatch({type:"MODAL_EDIT", edit: false})
    }
    const handleInputChange = (e) => {
        let value = e.target.value
        const name = e.target.name
        if (name === 'availability') {
            value = value === 'true'? true : false
        }
        updateModalEdit(name, value)
    }
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(src + '/change', formData);
            updateCars(formData)
            console.log(response.data);
        } catch (error) {
        console.error(error);
        }
        closeModalEdit()
        
    }
    return (
        <div className={`modal ${active? 'active': ''}`}>
            <form className="modal__content" onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    name="car"
                    value={formData.car.toString()}
                    readOnly
                />
                <input
                    type="text"
                    name="car_model"
                    value={formData.car_model.toString()}
                    readOnly
                />
                <input
                    type="text"
                    name="car_vin"
                    value={formData.car_vin.toString()}
                    readOnly
                />
                <input
                    type="text"
                    name="car_color"
                    value={formData.car_color.toString()}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="car_model_year"
                    value={formData.car_model_year}
                    readOnly
                />
                    <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                />
                <button type="submit">Change</button>
                <img src="../img/cross.svg" alt="cross" onClick={() => {closeModalEdit()}}/>
            </form>
        </div>
    )
}