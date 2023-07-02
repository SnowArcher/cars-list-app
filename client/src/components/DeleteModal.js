import { useDispatch, useSelector} from "react-redux"
import axios from 'axios'

export default function DeleteModal({active, src}) {
    const id = useSelector(state => state.deleteId)
    const dispatch = useDispatch()
    const closeModal = () => {
        dispatch({type: "OPEN_MODAL_DELETE", openDelete: false})
        dispatch({type: "DELETE_ID", id: null})
    }
    return (
        <div className={`modal__delete ${active? 'active': ''}`}>
            <div className="modal__delete_content">
                <p>Are you sure you want to perform this action?</p>
                <button id="firstbtn" onClick={async () => {
                    try {
                        const response = await axios.post(src + '/delete?id=' + id);
                        console.log(response.data);
                    } catch (error) {
                    console.error(error);
                    }
                    closeModal()
                }}>Yes</button>
                <button id="secondbtn" onClick={() => {closeModal()}}>No</button>
            </div>
        </div>
    )
}