import { useDispatch, useSelector} from "react-redux"
import { useState, useEffect} from "react";
import axios from 'axios'

export default function ModalAdd({active, src, update}) {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        car: "",
        car_model: "",
        car_color: "",
        car_model_year: null,
        car_vin: "",
        price: "",
        availability: false,
    });
    const closeModalAdd = () => {
        dispatch({type:"MODAL_ADD", add: false})
    }
    const handleInputChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    const cars = useSelector(state => state.cars)
    useEffect(() => {
        axios.get(src).then(data => {
            dispatch({type: 'ALL_CARS', setAll: data.data})
        }).catch(error => {
          console.log(error);
        });
        update(cars)
    }, [dispatch, cars, update, src])
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(src + '/add', formData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
        closeModalAdd()
    }
    return (
        <div className={`modal__add ${active? 'active': ''}`}>
            <div className="modal__add_content">
                <div className="add__item">
                    <ul>
                        <li>{`Company:`}</li>
                        <li>{`Model:`}</li>
                        <li>{`VIN:`}</li>
                        <li>{`Color:`}</li>
                        <li>{`Year:`}</li>
                        <li>{`Price:`}</li>
                        <li>{`Availability:`}</li>
                    </ul>
                    <form onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            name="car"
                            value={formData.car}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="car_model"
                            value={formData.car_model}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="car_vin"
                            value={formData.car_vin}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="car_color"
                            value={formData.car_color}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="car_model_year"
                            value={formData.car_model_year}
                            onChange={handleInputChange}
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
                        <button type="submit">Add Car</button>
                    </form>
                </div>
                <img src="../img/cross.svg" alt="cross" onClick={() => {closeModalAdd()}}/>
            </div>
        </div>
    )
}