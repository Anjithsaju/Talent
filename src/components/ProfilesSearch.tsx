import Card from "./Card";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import Sidenav from "./Sidenav";

// ✅ Define the User Type
interface User {
  id: number;
  name: string;
  talent: string;
  profilepic: string; // ✅ Added profile picture
  userid: string; // ✅ Added user ID
}

function ProfilesSearch() {
  const [isSidenavOpen, setIsSidenavOpen] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]); // ✅ Explicitly typed users array
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]); // ✅ Explicitly typed filteredUsers array
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/users", {
          method: "GET",
          credentials: "include", // 🔥 Required to send cookies
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data: User[] = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (!users.length) return;

    const newFilteredUsers = users.filter((user) => {
      const userName = user.name ? user.name.toLowerCase() : ""; // ✅ Ensure user.name is valid
      const matchesSearch = userName.includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || user.talent === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    setFilteredUsers(newFilteredUsers);
  }, [searchQuery, selectedCategory, users]);

  return (
    <>
      <section className="w-full h-screen flex flex-col overflow-hidden">
        {/* Navbar (Fixed at the Top) */}
        <Navbar />

        {/* Main Layout (Parent Flex Box) */}
        {/* bg-[radial-gradient(white,_#d3d3d3)] */}
        <div className="flex flex-1  bg-[#e8effa] ">
          {/* Side Navigation (Fixed) */}
          {/* <div
            className={`bg-gray-800 text-white h-full transition-all duration-300 ${
              isSidenavOpen ? "w-70" : "w-0 overflow-hidden"
            }`}
          > */}
          {isSidenavOpen && (
            <Sidenav
              setSearchQuery={setSearchQuery}
              setSelectedCategory={setSelectedCategory}
              setIsSidenavOpen={setIsSidenavOpen} // Pass the function to Sidenav
            />
          )}
          {/* </div> */}

          {/* Scrollable Content */}
          <div className="flex-1 h-full">
            {/* Only This Div Scrolls */}
            <div className="h-[calc(100vh-64px)] overflow-y-auto pt-4 pb-10 flex flex-wrap gap-2 ">
              {loading ? (
                <div className="text-white">Loading...</div>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => <Card key={user.id} user={user} />)
              ) : (
                <div className="text-white">No users found.</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProfilesSearch;
