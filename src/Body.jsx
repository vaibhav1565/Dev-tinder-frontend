import NavBar from "./NavBar";
// import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="h-screen">
      <NavBar />
      {/* <h1 className="text-3xl font-bold underline h-min">Hello world!</h1> */}
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default Body;
