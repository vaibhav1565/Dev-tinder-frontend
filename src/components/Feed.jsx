import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const feed = useSelector((store) => store.feed);

  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function handleFeed() {
      if (feed.length > 0) return;
      try {
        const res = await axios.get(BASE_URL + "/feed", {
          withCredentials: true,
          signal
        });
        dispatch(addFeed(res.data.data));
      } catch (e) {
        if (e.code !== "ERR_CANCELED" && e.code !== "ECONNABORTED") {
          console.log(e);
        }
      }
    }
    handleFeed();

    return ()=> {
      controller.abort();
    }
  }, [dispatch, feed.length]);
  if (feed.length === 0)
    return (
      <div className="text-center my-4">
        <h1 className="text-3xl">Feed</h1>
        <h2 className="text-lg">No more users found!</h2>
      </div>
    );
  return (
    <div>
      <h1 className="text-3xl text-center my-4">Feed</h1>
      {/* {feed.map((f, index) => (
        <UserCard userData={feed[index]} key={feed[index]._id} />
      ))} */}
      <UserCard userData={feed[0]} />
    </div>
  );
};

export default Feed;
