import { useState } from "react";

interface SidenavProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  setIsSidenavOpen: React.Dispatch<React.SetStateAction<boolean>>; // Add this if used in Sidenav
}

function Sidenav({ setSearchQuery, setSelectedCategory }: SidenavProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All"); // Track active category
  const [isSidenavVisible, setIsSidenavVisible] = useState<boolean>(true); // Track the visibility of sidenav

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setActiveCategory(category);
  };

  return (
    <>
      {/* The side navigation will only be visible if isSidenavVisible is true */}
      {isSidenavVisible && (
        <div className="side h-screen bg-white text-black w-[inherit] p-4">
          {/* Search Form */}
          <form
            className="flex gap-2 mb-4"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              setSearchQuery((e.target as HTMLFormElement).searchInput.value);
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
          <ul className="list-none space-y-2 text-lg">
            {[
              { name: "All", icon: "🌐" },
              { name: "Acting", icon: "🎭" },
              { name: "Singing", icon: "🎤" },
              { name: "Dancing", icon: "💃" },
              { name: "Playing Instruments", icon: "🎸" },
              { name: "Painting", icon: "🎨" },
              { name: "Writing", icon: "✍️" },
              { name: "Filmmaking", icon: "🎬" },
            ].map((category) => (
              <li
                key={category.name}
                className={`p-2 rounded cursor-pointer flex items-center gap-2 ${
                  activeCategory === category.name
                    ? "bg-gray-200 text-black"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleCategoryClick(category.name)}
              >
                {category.icon} {category.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        onClick={() => setIsSidenavVisible((prev) => !prev)} // Toggle the sidenav visibility state
        className="h-fit relative top-[40%] right-[14px] !p-[5px] bg-gray-700 rounded text-white z-50"
      >
        ☰
      </button>
    </>
  );
}

export default Sidenav;
