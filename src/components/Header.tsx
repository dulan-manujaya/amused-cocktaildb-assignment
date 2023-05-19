import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";

export default function Header() {
  const headerItems = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Favorites",
      path: "/favorites",
    },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const [currentPath, setCurrentPath] = useState<string>("/");

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  return (
    <header className="h-16 max-h-16 flex items-center justify-between shadow-lg w-full px-4 pr-8 md:px-12 fixed top-0 z-30 bg-blue-500">
      <div className="flex w-full items-center justify-between space-x-4">
        <nav>
          <ul className="flex items-center justify-start space-x-4 lg:space-x-12">
            {headerItems.map((item) => (
              <li
                className={`${
                  currentPath === item.path ? "underline" : ""
                } text-white text-xl cursor-pointer transition-all duration-300 hover:text-gray-300`}
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                }}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center justify-end space-x-4 ">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
