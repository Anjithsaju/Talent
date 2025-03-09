function Navbar({
  isSidenavOpen,
  setIsSidenavOpen,
}: {
  isSidenavOpen: boolean;
  setIsSidenavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <nav className="navbar bg-body-tertiary shadow-md flex justify-between items-center p-4">
      <div className="container-fluid flex justify-between w-full">
        {/* Toggle Button */}
        <button
          className="btn btn-outline-primary"
          onClick={() => setIsSidenavOpen(!isSidenavOpen)}
        >
          ☰ {/* Folder Icon for menu */}
        </button>

        <nav>
          <ul className="nav nav-underline">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/home">
                🏠 Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="/Profiles">
                🔍 Search
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Registration">
                👤 Profile
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">
                🚫 Disabled
              </a>
            </li>
          </ul>
        </nav>

        {/* Navbar Brand */}
        <a className="navbar-brand">🌟 Talents</a>
      </div>
    </nav>
  );
}

export default Navbar;
