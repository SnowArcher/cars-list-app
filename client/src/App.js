import './App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import SearchBar from './components/SearchBar';
import CarItem from './components/CarItem';
import Pagination from './components/Pagination';
import ModalEdit from './components/ModalEdit';
import DeleteModal from './components/DeleteModal';
import ModalAdd from './components/ModalAdd';

function App() {
  
  //const src = 'http://localhost:5000/api/cars';
  const src = 'https://cars-list-app-api.vercel.app/api/cars';  //vercel
  //const src = 'https://myfakeapi.com/api/cars';
  const cars = useSelector(state => state.cars);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const modalEdit = useSelector(state => state.modalEdit);
  const modalDelete = useSelector(state => state.modalDelete);
  const modalAdd =useSelector(state => state.modalAdd);
  const query = useSelector(state => state.query);
  const filtredCars = useSelector(state => state.filtredCars);
  const [renderedCars, setRender] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
      axios.get(src).then(data => {
          dispatch({type: 'ALL_CARS', setAll: data.data});
      }).catch(error => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    setRender((query && filtredCars.length > 0)? filtredCars.slice(firstPostIndex, lastPostIndex) : cars.slice(firstPostIndex, lastPostIndex));
  }, [cars, query, filtredCars, firstPostIndex, lastPostIndex]);
  return (<>
      <SearchBar 
        query={query}
        setCurrentPage={setCurrentPage}
      />
      <div className='cars-list'>
        {
          renderedCars.map(item => 
            (
              <CarItem key={item.id}
                id={item.id} 
                company={item.car} 
                model={item.car_model} 
                vin={item.car_vin} 
                color={item.car_color} 
                year={item.car_model_year} 
                price={item.price} 
                availability={item.availability}
              />
            )
          )
        }
      </div>
      <ModalEdit 
        active={modalEdit}
        first={firstPostIndex}
        last={lastPostIndex}
        setRender={setRender}
        src={src}/>
      <DeleteModal 
        active={modalDelete}
        first={firstPostIndex}
        last={lastPostIndex}
        setRender={setRender}
        src={src}
        />
      <ModalAdd 
        active={modalAdd}
        first={firstPostIndex}
        last={lastPostIndex}
        setRender={setRender}
        src={src}/>
      <Pagination 
        totalPosts={query? filtredCars.length : cars.length} 
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default App;
