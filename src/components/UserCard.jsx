import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import {removeFeed} from "../utils/feedSlice"

const UserCard = ({userData, showButton = true}) => {
  const { _id, firstName, lastName, photoUrl, about, age, gender } = userData;

  const dispatch = useDispatch();
  async function handleSend(status, _id) {
    try {
      const res = await axios.post(
        BASE_URL + `/request/send/${status}/${_id}`,
        {},
        {withCredentials: true}
      );
      dispatch(removeFeed(_id));
    }
    catch (e) {
      console.error(e);
    }
  }
  return (
    <div className="card card-compact bg-base-300 w-80 shadow-xl">
      <figure>
        <img src={photoUrl} alt="user" className="w-40" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{about}</p>
        <p>{age && gender && age + "," + gender}</p>
        <div className="card-actions justify-center">
          {showButton && (
            <button
              className="btn btn-primary"
              onClick={() => handleSend("ignored", _id)}
            >
              Ignore
            </button>
          )}
          {showButton && (
            <button
              className="btn btn-secondary"
              onClick={() => handleSend("interested", _id)}
            >
              Interested
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;