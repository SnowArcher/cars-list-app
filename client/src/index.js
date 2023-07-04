import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createStore} from 'redux';
import { Provider } from 'react-redux';

const defaultState = {
  query: '',
  modalEdit: false,
  modalDelete: false,
  deleteId: null,
  modalAdd: false,
  cars: [],
  filtredCars: [],
  modalContent: {
    id: null,
    car: "NOT FOUND",
    car_model: "",
    car_color: "",
    car_model_year: null,
    car_vin: "",
    price: "$0",
    availability: false
  }
}
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "MODAL_EDIT":
      return {...state, modalEdit: action.edit}
    case "MODAL_DELETE":
      return {...state, modalDelete: action.delete}
    case "DELETE_ID":
      return {...state, deleteId: action.id}
    case "MODAL_ADD":
      return {...state, modalAdd: action.add}
    case "ALL_CARS":
      return {...state, cars: action.setAll}
    case "SEARCH_CARS":
      return {...state, query: action.search}
    case "FILTERED_CARS":
      return {...state, filtredCars: action.filter}
    case "CHANGE_CAR":
      return {...state, modalContent: action.change}
    default: 
      return state
  }
}
const store =createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

