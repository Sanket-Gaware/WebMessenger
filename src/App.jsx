import "./App.css";
import RoutingFile from "./RouteFile/RoutingFile";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <RoutingFile />
    </>
  );
}

export default App;
