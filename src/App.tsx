import "./App.css";
import { Routes, Route } from "react-router-dom";
import Profiles from "./Pages/Profiles";
import Registration from "./Pages/Registration";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={""} />
        <Route path="/Profiles" element={<Profiles />} />
        <Route path="/Registration" element={<Registration />} />
      </Routes>
    </>
  );
}

export default App;
