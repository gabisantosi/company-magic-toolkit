import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "@supabase/auth-helpers-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const session = useSession();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-[0_2px_15px_-3px_rgba(0,106,167,0.1),0_10px_20px_-2px_rgba(0,106,167,0.04)] sticky top-0 z-50 border-b border-swedish-blue/10">
      <div className="absolute inset-0 bg-gradient-to-r from-swedish-blue/5 to-swedish-yellow/5 opacity-50"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-swedish-blue to-swedish-blue/80 bg-clip-text text-transparent [text-shadow:_0_2px_4px_rgb(0_0_0_/_5%)]">
                Your Logo
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-transparent text-gray-500 hover:text-swedish-blue inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-swedish-blue/50"
              >
                Home
              </Link>
              <Link
                to="/checklist"
                className="border-transparent text-gray-500 hover:text-swedish-blue inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-swedish-blue/50"
              >
                Checklist
              </Link>
              <Link
                to="/simulator"
                className="border-transparent text-gray-500 hover:text-swedish-blue inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-swedish-blue/50"
              >
                Simulator
              </Link>
              <Link
                to="/guide"
                className="border-transparent text-gray-500 hover:text-swedish-blue inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-swedish-blue/50"
              >
                Guide
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {session ? (
              <Button
                onClick={handleLogout}
                variant="outline"
                className="ml-4 border-swedish-blue/50 text-swedish-blue hover:bg-swedish-blue/10 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 hover:ring-2 hover:ring-swedish-blue/20 hover:ring-offset-2 hover:ring-offset-transparent backdrop-blur-sm"
              >
                Logout
              </Button>
            ) : (
              <Button
                onClick={() => navigate('/login')}
                variant="outline"
                className="ml-4 border-swedish-blue/50 text-swedish-blue hover:bg-swedish-blue/10 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 hover:ring-2 hover:ring-swedish-blue/20 hover:ring-offset-2 hover:ring-offset-transparent backdrop-blur-sm"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;