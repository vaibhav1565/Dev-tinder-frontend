import axios from 'axios'

import {BASE_URL} from "../utils/constants";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addConnections } from '../utils/connectionsSlice';
const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector(store => store.connections)

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchConnections() {
      if (connections.length > 0) return;

      try {
        const res = await axios.get(`${BASE_URL}/user/connections`, {
          withCredentials: true,
          signal, // Pass the signal to axios
        });
        dispatch(addConnections(res.data.data));
      } catch (e) {
        if (e.code !== "ERR_CANCELED" && e.code !== "ECONNABORTED") {
          console.log(e);
        }
      }
    }

    fetchConnections();

    return () => {
      controller.abort(); // Cancel request if component unmounts or re-renders
    };
  }, [dispatch, connections.length]);
  
  if (connections.length === 0) return <h1>You have no connections!</h1>
  return (
      <ul>
        <h2 className="text-center text-3xl text-white mb-4 mt-1">
          Connections
        </h2>
        {connections.map((connection) => {
          return (
            <li className="bg-slate-900 w-[500px] h-[150px]" key={connection._id}>
              <div className="flex">
                <img src={connection.photoUrl} alt="photo" className="h-[150px] w-[200px]" />
                <div>
                  <p>{connection.firstName + (connection.lastName ? " " + connection.lastName : "")}</p>
                  <p>{connection.about}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
  );
}

export default Connections