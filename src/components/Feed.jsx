import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const feed = useSelector((store) => store.feed);

  const dispatch = useDispatch();

  async function handleFeed() {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", 
        {withCredentials: true}
      );
      dispatch(addFeed(res.data.data));
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    handleFeed();
  }, []);
  if (!feed) return;
  if (feed.length === 0) return <h1>No more users found!</h1>
  return (
    <div>
      {feed.map((f, index) => <UserCard userData={feed[index]} key={feed[index]._id}/>)}
    </div>
  );
};

export default Feed;
