import { useState, useRef, useEffect} from "react";
import {useDispatch} from 'react-redux';

export default function CarItem({id, company, model, vin, color, year, price, availability}) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef();
    const dispatch = useDispatch();
    const changeCar = (id, company, model, vin, color, year, price, availability) => {
        dispatch({type:"CHANGE_CAR", change: {
            id: id,
            car: company,
            car_model: model,
            car_color: color,
            car_model_year: year,
            car_vin: vin,
            price: price,
            availability: availability,
        }});
    };
    const openModalEdit = () => {
        dispatch({type:"MODAL_EDIT", edit: true});
    };
    const openModalDelete = (id) => {
        dispatch({type:"MODAL_DELETE", delete: true});
        dispatch({type:"DELETE_ID", id: id});
    };
    useEffect(() => {
        const handler = (e) => {
            if(!menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("click", handler);
        return () => {
            document.removeEventListener("click", handler);
        }
    }, [])
    return (
        <div className="cars-list__item" id={id}>
            <ul>
                <li>{`Company: ${company}`}</li>
                <li>{`Model: ${model}`}</li>
                <li>{`VIN: ${vin}`}</li>
                <li>{`Color: ${color}`}</li>
                <li>{`Year: ${year}`}</li>
                <li>{`Price: ${price}`}</li>
                <li>{`Availability: ${availability}`}</li>
            </ul>
            <div className={`menu ${open? 'active' : ''}`} ref={menuRef}>
                <img src={`../img/${!open? 'closed-menu' : 'opened-menu'}.svg`} alt="menu-icon" onClick={() => {setOpen(!open)}}/>
                <ul>
                    <li onClick={(e) => {
                        e.stopPropagation();
                        changeCar(id, company, model, vin, color, year, price, availability);
                        openModalEdit();
                        setOpen(!open);
                    }}>Edit</li>
                    <li onClick={(e) => {
                        e.stopPropagation();
                        openModalDelete(id);
                        setOpen(!open);
                    }}>Delete</li>
                </ul>
            </div>
        </div>
    );
}