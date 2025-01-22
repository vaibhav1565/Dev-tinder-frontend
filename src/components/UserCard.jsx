import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import { useState } from "react";

const UserCard = ({ userData, showButton = true }) => {
  const { _id, firstName, lastName, photoUrl, about, age, gender } = showButton
    ? userData
    : userData.data;

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  async function handleSend(status, _id) {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + `/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(_id));
    } catch (e) {
      if (e?.response?.data?.error === "Connection request already exists") {
        dispatch(removeFeed(_id));
      }
      console.error(e);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="card card-compact bg-base-300 w-80 shadow-xl">
      <div>
        <figure>
          <img src={photoUrl} className="w-40" />
        </figure>

        <div className="card-body">
          <h2 className="card-title">
            {firstName + (lastName ? " " + lastName : "")}
          </h2>
          <p>{about}</p>
          <p>{age && gender && age + "," + gender}</p>
          {showButton && (
            <div className="card-actions justify-center">
              <button
                className="btn btn-primary"
                onClick={() => handleSend("ignored", _id)}
              >
                Ignore
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => handleSend("interested", _id)}
              >
                Interested
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
