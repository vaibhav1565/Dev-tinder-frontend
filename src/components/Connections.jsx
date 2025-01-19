import axios from 'axios'
import {BASE_URL} from "../utils/constants";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionsSlice';
const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector(store => store.connections)
  async function fetchConnections() {
    if (connections) return;
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {withCredentials: true});
      console.log(res.data.data);
      dispatch(addConnections(res.data.data))
    }
    catch (e) {
      console.log(e);
    }
  }
  useEffect(()=>{
    fetchConnections();
  },[])
  
  if (!connections) return;
  if (connections.length === 0) return <h1>You have no connections!</h1>
  return (
    <div className="">
      <ul className="">
        <h2 className="text-center text-3xl text-white mb-4 mt-1">
          Connections
        </h2>
        {connections.map((connection) => {
          return (
            <li className="bg-slate-900 w-[500px] h-[150px]" key={connection._id}>
              <div className="flex">
                <img src={connection.photoUrl} alt="photo" className="h-[150px] w-[200px]" />
                <div>
                  <p>{connection.firstName + " " + connection.lastName}</p>
                  <p>{connection.about}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Connections