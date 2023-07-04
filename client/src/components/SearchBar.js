import { useDispatch } from "react-redux";

export default function SearchBar({cars, setCurrentPage, query}) {
    const getFilteredItems = (query, cars) => {
        if (!query) {
          return cars;
        }
        return cars.filter(item => {
            return Object.values(item).some(value => {
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
            });
          })
      }
    const filtredCars = getFilteredItems(query, cars)
    const dispatch = useDispatch()
    const setQuery = (value) => {
        dispatch({type: "SEARCH_CARS", search: value})
    }
    const searchCar= () => {
        dispatch({type:"FILTERED_CARS", filter: filtredCars})
    }
    const addCar = () => {
        dispatch({type:"MODAL_ADD", add: true})
    }
    return (
        <div className="search-bar">
            <div className="search-bar__item">
                <h1>Search:</h1>
                <input 
                    type="text" 
                    placeholder="Search Car" 
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            searchCar()
                            setCurrentPage(1)
                        }
                      }}
                />
                <img src="../img/search-icon.svg" alt="search-icon" onClick={() => {
                        searchCar()
                        setCurrentPage(1)
                    }
                }/>
            </div>
            <button className="add__car" onClick={() => {addCar()}}>Add Car</button>
        </div>
    );
}