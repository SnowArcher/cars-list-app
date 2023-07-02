import {useDispatch, useSelector} from 'react-redux';
import { useState , useEffect} from 'react';
import axios from 'axios';

export default function ModalEdit({active, src}) {
    const dispatch = useDispatch()
    const modalContent = useSelector(state => state.modalContent)
    console.log(modalContent)
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
    console.log(formData)
    const updateModal = (name, value) => {
        dispatch({type: "CHANGE_CAR", change: {...modalContent, [name]: value}})
    }
    const closeModal = () => {
        dispatch({type:"OPEN_MODAL", open: false})
    }
    const handleInputChange = (e) => {
        let value = e.target.value
        const name = e.target.name
        if (name === 'availability') {
            value = value === 'true'? true : false
        }
        updateModal(name, value)
    }
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(src + '/change', formData);
            console.log(response.data);
        } catch (error) {
        console.error(error);
        }
        closeModal()
        
    }
    return (
        <div className={`modal ${active? 'active': ''}`}>
            <form className="modal__content" onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    name="car"
                    value={formData.car}
                    readOnly
                />
                <input
                    type="text"
                    name="car_model"
                    value={formData.car_model}
                    readOnly
                />
                <input
                    type="text"
                    name="car_vin"
                    value={formData.car_vin}
                    readOnly
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
                <img src="../img/cross.svg" alt="cross" onClick={() => {closeModal()}}/>
            </form>
        </div>
    )
}