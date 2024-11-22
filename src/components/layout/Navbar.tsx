import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-swedish-blue">
            SwedishStartup
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-swedish-blue transition-colors">
              Home
            </Link>
            <Link to="/checklist" className="text-gray-600 hover:text-swedish-blue transition-colors">
              Checklist
            </Link>
            <Link to="/simulator" className="text-gray-600 hover:text-swedish-blue transition-colors">
              Cost Simulator
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;