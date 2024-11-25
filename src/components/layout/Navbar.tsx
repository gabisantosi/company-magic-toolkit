import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <Logo />
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/checklist">
            <Button variant="ghost">Checklist</Button>
          </Link>
          <Link to="/simulator">
            <Button variant="ghost">Cost Calculator</Button>
          </Link>
          <Link to="/guide">
            <Button variant="ghost">Guide</Button>
          </Link>
          <Link to="/questionnaire">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;