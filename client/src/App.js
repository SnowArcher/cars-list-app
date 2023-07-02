import './App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import SearchBar from './components/SearchBar';
import CarItem from './components/CarItem';
import Pagination from './components/Pagination';
import ModalEdit from './components/ModalEdit';
import DeleteModal from './components/DeleteModal';
import ModalAdd from './components/ModalAdd';

function App() {
  const src = 'http://localhost:5000/api/cars'
  const [cars, setCars] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6
  const lastPostIndex = currentPage * postsPerPage
  const firstPostIndex = lastPostIndex - postsPerPage
  const modal = useSelector(state => state.modal)
  const modalDelete = useSelector(state => state.delete)
  const modalAdd =useSelector(state => state.addCar)
  const searchRes = useSelector(state => state.filtredCars)
  useEffect(() => {
      axios.get(src).then(data => {
          setCars(data.data)
      }).catch(error => {
        console.log(error);
      });
  }, [])
  const filtredCars = searchRes.length !== 0? searchRes.slice(firstPostIndex, lastPostIndex) : cars.slice(firstPostIndex, lastPostIndex)
  return (<>
      <SearchBar 
        cars={cars}
        setCurrentPage={setCurrentPage}
      />
      <div className='cars-list'>
        {
          filtredCars.map(item => 
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
        active={modal}
        src={src}/>
      <DeleteModal 
        active={modalDelete}
        src={src}
        />
      <ModalAdd 
        active={modalAdd}
        src={src}/>
      <Pagination 
        totalPosts={searchRes.length > 0? searchRes.length : cars.length} 
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default App;
