function Sidenav({ setSearchQuery, setSelectedCategory }) {
  return (
    <div className="h-screen bg-gray-900 text-white w-[inherit] p-4">
      {/* Search Form */}
      <form
        className="flex gap-2 mb-4"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          setSearchQuery(e.target.searchInput.value); // Update search query when form is submitted
        }}
      >
        <input
          id="searchInput"
          className="form-control p-2 rounded-md w-full"
          type="search"
          placeholder="Search talents..."
          aria-label="Search"
        />
        <button className="btn btn-outline-success p-2" type="submit">
          🔍
        </button>
      </form>

      {/* Categories Section */}
      <h5 className="text-lg font-bold mb-2">Categories</h5>
      <ul className="list-none space-y-2">
        {/* All category */}
        <li
          className="hover:bg-gray-700 p-2 rounded cursor-pointer"
          onClick={() => setSelectedCategory("All")} // Clicking All will show all profiles
        >
          🌐 All
        </li>

        {/* Other categories */}
        <li
          className="hover:bg-gray-700 p-2 rounded cursor-pointer"
          onClick={() => setSelectedCategory("Acting")}
        >
          🎭 Acting
        </li>

        <li
          className="hover:bg-gray-700 p-2 rounded cursor-pointer"
          onClick={() => setSelectedCategory("Singing")}
        >
          🎤 Singing
        </li>

        <li
          className="hover:bg-gray-700 p-2 rounded cursor-pointer"
          onClick={() => setSelectedCategory("Dancing")}
        >
          💃 Dancing
        </li>

        <li
          className="hover:bg-gray-700 p-2 rounded cursor-pointer"
          onClick={() => setSelectedCategory("Playing Instruments")}
        >
          🎸 Playing Instruments
        </li>

        <li
          className="hover:bg-gray-700 p-2 rounded cursor-pointer"
          onClick={() => setSelectedCategory("Painting")}
        >
          🎨 Painting
        </li>

        <li
          className="hover:bg-gray-700 p-2 rounded cursor-pointer"
          onClick={() => setSelectedCategory("Writing")}
        >
          ✍️ Writing
        </li>

        <li
          className="hover:bg-gray-700 p-2 rounded cursor-pointer"
          onClick={() => setSelectedCategory("Filmmaking")}
        >
          🎬 Filmmaking
        </li>
      </ul>
    </div>
  );
}

export default Sidenav;
