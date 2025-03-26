import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const location = useLocation(); // ✅ Get current route path

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include", // Ensures cookies are sent
      });

      if (response.ok) {
        localStorage.removeItem("token"); // Clear session storage
        navigate("/"); // Redirect to login
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const navigate = useNavigate();
  return (
    <nav className="navbar bg-[#28095b]  flex justify-between items-center p-2">
      <div className="container-fluid flex justify-between w-full">
        <span className="navbar-brand text-white">🌟 Talents</span>

        <nav>
          <ul className="nav nav-underline">
            <li className="nav-item ">
              <NavLink
                to="/home"
                className={`nav-link ${
                  location.pathname === "/home"
                    ? "active text-white font-bold"
                    : "text-white"
                }`}
              >
                🏠 Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/Profiles"
                className={`nav-link ${
                  location.pathname === "/Profiles"
                    ? "active text-white font-bold"
                    : "text-white"
                }`}
              >
                🔍 Search
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/Profile"
                className={`nav-link ${
                  location.pathname === "/Profile"
                    ? "active text-white font-bold"
                    : "text-white"
                }`}
              >
                👤 Profile
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <span
                className="nav-link disabled text-gray-500"
                aria-disabled="true"
              >
                🚫 Disabled
              </span>
            </li> */}
          </ul>
        </nav>

        <button
          onClick={handleLogout}
          className="!bg-blue-900 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
        <div className="absolute inset-x-0 w-[80%] mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-800 to-transparent h-[2px]"></div>
      </div>
    </nav>
  );
}

export default Navbar;
