import { useDispatch, useSelector} from "react-redux";
import { useState} from "react";
import axios from "axios";

function useUpdateCars(src, setRender, first, last) {
    const dispatch = useDispatch();
    let filtredCars = useSelector(state => state.filtredCars);
    let cars = useSelector(state => state.cars);
    const query = useSelector(state => state.query);
    const updateCars = async () => {
        cars = await axios.get(src).then(data => {return data.data}).catch(error => console.log(error));
        dispatch({ type: "ALL_CARS", setAll: cars }); 
        const response = await axios.get(src +'/last').then(data => {return data.data}).catch(error => console.log(error));
        if (Object.values(response).some(value => {
            if (typeof value === 'string') {
                return value.toLowerCase().includes(query.toLowerCase());
            }
            if (typeof value === 'number') {
                return value.toString().includes(query.toLowerCase());
            }
            if (typeof value === 'boolean') {
                return value.toString().includes(query.toLowerCase());
            }
            return false;
        })) {
            filtredCars.push(response);
            dispatch({ type: "FILTERED_CARS", filter: filtredCars});
            if (query && filtredCars.length > 0) {
                setRender(filtredCars.slice(first, last));
            }
        }
    };
    return updateCars;
}

export default function ModalAdd({active, src, setRender, first, last}) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        car: "",
        car_model: "",
        car_color: "",
        car_model_year: 0,
        car_vin: "",
        price: "",
        availability: false,
    });
    const closeModalAdd = () => {
        dispatch({type:"MODAL_ADD", add: false})
    };
    const handleInputChange = (e) => {
        setFormData((e.target.name === 'price' && !e.target.value.startsWith('$'))? {
            ...formData,
            [e.target.name]: '$' + e.target.value,
          }:{
          ...formData,
          [e.target.name]: e.target.value,
        });
    };
    const updateCars = useUpdateCars(src, setRender, first, last);
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(src + '/add', formData);
            updateCars();
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
        closeModalAdd();
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
                        <select name="availability"
                            value={formData.availability}
                            onChange={handleInputChange}>
                            <option value={true}>true</option>
                            <option value={false}>false</option>
                        </select>
                        <button type="submit">Add Car</button>
                    </form>
                </div>
                <img src="../img/cross.svg" alt="cross" onClick={() => {closeModalAdd()}}/>
            </div>
        </div>
    )
}