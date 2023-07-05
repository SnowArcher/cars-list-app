import {useDispatch, useSelector} from 'react-redux';
import { useState , useEffect} from 'react';
import axios from 'axios';

function useUpdateCars(formData, setRender, first, last) {
    const dispatch = useDispatch();
    const filtredCars = useSelector(state => state.filtredCars);
    const cars = useSelector(state => state.cars);
    const query = useSelector(state => state.query);
    const updateCars = () => {
        if (query) {
            const updatedFiltredCars = filtredCars.map(car => {
                if (car.id === formData.id) {
                  return formData;
                }
                return car;
              });
            dispatch({ type: "FILTERED_CARS", filter: updatedFiltredCars });
            if (updatedFiltredCars.length > 0) {
                setRender(updatedFiltredCars.slice(first, last));
            }
        }
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

export default function ModalEdit({active, src, setRender, first, last}) {
    const dispatch = useDispatch()
    const modalContent = useSelector(state => state.modalContent)
    const [formData, setFormData] = useState({
        id: 0,
        car: 'NOT FOUND',
        car_model: 'NOT FOUND',
        car_color: 'NOT FOUND',
        car_model_year: 0,
        car_vin: 'NOT FOUND',
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
    const updateCars = useUpdateCars(formData, setRender, first, last);
    const updateModalEdit = (name, value) => {
        dispatch({type: "CHANGE_CAR", change: {...modalContent, [name]: value}})
    }
    const closeModalEdit = () => {
        dispatch({type:"MODAL_EDIT", edit: false})
    }
    const handleInputChange = (e) => {
        let value = e.target.value;
        const name = e.target.name;
        if (name === 'price' && !value.startsWith("$")) {
            value = '$' + value;
        }
        updateModalEdit(name, value);
    }
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(src + '/change', formData);
            updateCars(formData);
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
                <input className='enable'
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
                <input className='enable'
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                />
                <select name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}>
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>
                <button type="submit">Change</button>
                <img src="../img/cross.svg" alt="cross" onClick={() => {closeModalEdit()}}/>
            </form>
        </div>
    )
}