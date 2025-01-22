import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addRequests, removeRequest } from "../utils/requestsSlice";
const Requests = () => {
  const dispatch = useDispatch();

  const connectionRequests = useSelector((store) => store.requests);

  async function reviewRequest(_id, status) {
    try {
      const res = await axios.post(
        BASE_URL + `/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch {}
  }

  useEffect(() => {
    async function fetchRequests() {
      if (connectionRequests.length > 0) return;
      try {
        const res = await axios.get(BASE_URL + "/user/requests/received", {
          withCredentials: true,
        });
        dispatch(addRequests(res.data.data));
      } catch (e) {
        if (e?.response?.data?.error != "Token is not valid") console.error(e);
      }
    }
    fetchRequests();
  }, [dispatch, connectionRequests]);

  
  if (connectionRequests.length === 0)
    return <h1>You have no connection requests!</h1>;
  return (
    <div>
      <h1 className="text-center text-3xl text-white my-2">Requests</h1>
      {connectionRequests.map((r) => {
        const { firstName, lastName, photoUrl } = r.fromUserId;
        return (
          <li
            className="bg-slate-900 w-[500px] h-[150px] list-none"
            key={r._id}
          >
            <div className="flex">
              <img src={photoUrl} alt="photo" className="w-[150px]" />
              <div>
                <p>{firstName + (lastName ? " " + lastName : "")}</p>

                <div>
                  <button
                    className="btn btn-primary"
                    onClick={() => reviewRequest(r._id, "accepted")}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => reviewRequest(r._id, "rejected")}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </div>
  );
};

export default Requests;
