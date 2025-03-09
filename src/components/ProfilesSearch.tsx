import Card from "./Card";
import Navbar from "./Navbar";
import React, { useEffect, useState } from "react";
import Sidenav from "./Sidenav";

function ProfilesSearch() {
  const [isSidenavOpen, setIsSidenavOpen] = useState(true);
  const [users, setUsers] = useState([]); // State to store users
  const [filteredUsers, setFilteredUsers] = useState([]); // State to store filtered users
  const [loading, setLoading] = useState(true); // State to track loading status
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [selectedCategory, setSelectedCategory] = useState("All"); // Default category is "All"

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/users"); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json(); // Assuming response is JSON
          setUsers(data); // Store user data in state
          setFilteredUsers(data); // Initially set filtered users to all users
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchUsers(); // Fetch users when the component mounts
  }, []); // Empty dependency array ensures this runs once when the component mounts

  useEffect(() => {
    // Apply filtering whenever the search query or selected category changes
    const newFilteredUsers = users.filter((user) => {
      const matchesSearch = user.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // If "All" is selected, ignore category filter and show all profiles
      const matchesCategory =
        selectedCategory === "All" || user.talent === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    setFilteredUsers(newFilteredUsers); // Update filtered users state
  }, [searchQuery, selectedCategory, users]); // This effect depends on searchQuery, selectedCategory, and users

  return (
    <>
      <section className="w-full h-screen flex flex-col overflow-hidden">
        {/* Navbar (Fixed at the Top) */}
        <Navbar
          isSidenavOpen={isSidenavOpen}
          setIsSidenavOpen={setIsSidenavOpen}
        />

        {/* Main Layout (Parent Flex Box) */}
        <div className="flex flex-1">
          {/* Side Navigation (Fixed) */}
          <div
            className={`bg-gray-800 text-white h-full transition-all duration-300 ${
              isSidenavOpen ? "w-70" : "w-0 overflow-hidden"
            }`}
          >
            {isSidenavOpen && (
              <Sidenav
                setSearchQuery={setSearchQuery}
                setSelectedCategory={setSelectedCategory}
              />
            )}
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 h-full">
            {/* Only This Div Scrolls */}
            <div className="h-[calc(100vh-64px)] overflow-y-auto p-4 flex flex-wrap gap-2">
              {loading ? (
                <div>Loading...</div> // You can show a loader while data is being fetched
              ) : (
                filteredUsers.map((user) => (
                  <Card key={user.id} user={user} /> // Pass the filtered user data to the Card component
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProfilesSearch;
