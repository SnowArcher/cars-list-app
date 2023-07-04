import { useDispatch, useSelector} from "react-redux"
import axios from 'axios'

function useUpdateCars(id, setRender, first, last) {
    const dispatch = useDispatch();
    const filtredCars = useSelector(state => state.filtredCars);
    const cars = useSelector(state => state.cars);
    const query = useSelector(state => state.query);
    const updateCars = () => {
        if (query && filtredCars.length > 0) {
            const updatedFiltredCars = filtredCars.filter(car => car.id !== id);
            dispatch({ type: "FILTERED_CARS", filter: updatedFiltredCars});
            setRender(updatedFiltredCars.slice(first, last));
        }
        if (cars.length > 0) {
            const updatedCars = cars.filter(car => car.id !== id);
            dispatch({ type: "ALL_CARS", setAll: updatedCars });
        }
    };
    return updateCars;
}

export default function DeleteModal({active, src, setRender, first, last}) {
    const id = useSelector(state => state.deleteId);
    const dispatch = useDispatch();
    const closeModalDelete = () => {
        dispatch({type: "MODAL_DELETE", delete: false});
        dispatch({type: "DELETE_ID", id: null});
    }
    const updateCars = useUpdateCars(id, setRender, first, last);
    return (
        <div className={`modal__delete ${active? 'active': ''}`}>
            <div className="modal__delete_content">
                <p>Are you sure you want to perform this action?</p>
                <button id="firstbtn" onClick={async () => {
                    try {
                        const response = await axios.post(src + '/delete?id=' + id);
                        updateCars();
                        console.log(response.data);
                    } catch (error) {
                        console.error(error);
                    }
                    closeModalDelete();
                }}>Yes</button>
                <button id="secondbtn" onClick={() => {closeModalDelete()}}>No</button>
            </div>
        </div>
    )
}