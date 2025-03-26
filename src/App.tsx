import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Profiles from "./Pages/Profiles";
import Registration from "./Pages/Registration";
import Profile from "./Pages/Profile";
import useSessionCheck from "./components/Session"; // Import the session hook
import Home from "./Pages/Home";
function App() {
  const isAuthenticated = useSessionCheck();

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Show a loading state while checking session
  }

  return (
    <>
      <Routes>
        {/* Redirect to Login if not authenticated */}
        <Route path="/" element={<Login />} />

        {/* Protect these routes and redirect to "/" if not authenticated */}
        <Route
          path="/Home"
          element={isAuthenticated ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/Profiles"
          element={isAuthenticated ? <Profiles /> : <Navigate to="/" />}
        />
        <Route
          path="/Profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/:userId"
          element={isAuthenticated ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/Registration"
          element={isAuthenticated ? <Registration /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
