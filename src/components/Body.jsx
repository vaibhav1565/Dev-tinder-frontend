import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="h-screen">
      <NavBar />
      <div className="flex justify-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
