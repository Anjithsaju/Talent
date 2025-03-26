import Navbar from "../components/Navbar";
import React, { useEffect, useState, useRef } from "react";
function Home() {
  const [isSidenavOpen, setIsSidenavOpen] = useState<boolean>(true);
  return (
    <section className="w-full h-screen flex flex-col overflow-hidden">
      <Navbar
        isSidenavOpen={isSidenavOpen}
        setIsSidenavOpen={setIsSidenavOpen}
      />
    </section>
  );
}
export default Home;
