import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border-b border-swedish-blue/10 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <Logo />
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/questionnaire">
            <Button className="bg-swedish-blue hover:bg-swedish-blue/90 text-white transition-all duration-300 hover:shadow-lg hover:shadow-swedish-blue/20 hover:-translate-y-0.5">
              Start Analysis
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;