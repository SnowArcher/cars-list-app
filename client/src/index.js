import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createStore} from 'redux';
import { Provider } from 'react-redux';

const defaultState = {
  modal: false,
  delete: false,
  deleteId: null,
  addCar: false,
  filtredCars: [], 
  modalContent: {
    id: "",
    car: "NOT FOUND",
    car_model: "",
    car_color: "",
    car_model_year: 0,
    car_vin: "",
    price: "$0",
    availability: false
  }
}
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {...state, modal: action.open}
    case "OPEN_MODAL_DELETE":
      return {...state, delete: action.openDelete}
    case "DELETE_ID":
      return {...state, deleteId: action.id}
    case "OPEN_MODAL_ADD":
      return {...state, addCar: action.openAdd}
    case "SEARCH_CAR":
      return {...state, filtredCars: action.search}
    case "CHANGE_CAR":
      return {...state, modalContent: action.change}
    default: 
      return state
  }
}
const store =createStore(reducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

