import { Link, useLocation } from "react-router";

export const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/game", label: "Game" },
  ];

  return (
    <nav className="bg-gray-800 shadow-md">
      <ul className="flex items-center space-x-6 px-6 py-3">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`text-sm font-medium transition-colors duration-200 ${
                location.pathname === item.path
                  ? "text-white border-b-2 border-blue-500"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
