// import io from "socket.io-client";
// import { BASE_URL } from "./constants";
// import { useEffect, useState } from "react";

// export const useSocket = () => {
//     // if (location.hostname === "localhost") {
//     //     return io(BASE_URL);
//     // } else {
//     //     return io("/", { path: "/api/socket.io" });
//     // }
//     // return io(BASE_URL);
//     const [connection, setConnection] = useState(null);

//     useEffect(()=> {
//         setConnection(io(BASE_URL))

//         // return ()=> {
//         //     connection.disconnect();
//         // }
//     },[])

//     return connection;
// };
