import React from 'react';
import {thunk} from 'redux-thunk';
import axios from 'axios';
import {createStore, applyMiddleware} from 'redux';
import reducer from './Reducer';
import {fetchUserData, showError} from './Action';

const store = createStore(reducer, applyMiddleware(thunk));

const fetchData = () => async() => {
    try{
        let data = await axios.get("https://jsonplaceholder.typicode.com/users");
        store.dispatch(fetchUserData(data.data))
    }
    catch (error){
        store.dispatch(showError(error))
    }
}

const DisplayData = () => {
    const [showdata, setShowData] = React.useState(false);
    const [data, setData] = React.useState([]);
    function handleClick(){
        store.dispatch(fetchData());
        setShowData(!showdata);
    }
    React.useEffect(()=>{
        let subscribe = store.subscribe(() => setData(store.getState().users))
    },[])
    return(
        <>
            <button onClick={handleClick}>{showdata ? "Hide Data" : "Show Data" }</button>
            {showdata && (
                <div>
                    {data.map((el,i)=>(
                        <div style={{border:"1px solid black", padding:"10px"}} key = {i}>
                            <h3>{el.name}</h3>
                            <h3>{el.email}</h3>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default DisplayData;