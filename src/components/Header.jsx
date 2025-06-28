import { useEffect, useState } from "react";



function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/login"; // or navigate using React Router
  };

  return (
    <header className="w-full absolute top-0 left-0 z-50 flex items-center justify-between px-6 py-2 shadow-md">
      
      <div className="flex items-center space-x-4">

      </div>
      {/* User Info / Logout */}
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        ) : (
          <a
            href="/login"
            className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition"
          >
            Login / Sign Up
          </a>
        )}
      </div>
    </header>
  );
}

export default Header;
