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
    <nav className="bg-white/80 backdrop-blur-sm fixed w-full top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-swedish-blue">SwedishStartup</span>
            </Link>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="text-gray-500 hover:text-swedish-blue px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/checklist"
                className="text-gray-500 hover:text-swedish-blue px-3 py-2 text-sm font-medium transition-colors"
              >
                Checklist
              </Link>
              <Link
                to="/simulator"
                className="text-gray-500 hover:text-swedish-blue px-3 py-2 text-sm font-medium transition-colors"
              >
                Simulator
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {session ? (
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="text-gray-500 hover:text-swedish-blue"
              >
                Logout
              </Button>
            ) : (
              <Button
                onClick={() => navigate('/login')}
                variant="ghost"
                className="text-gray-500 hover:text-swedish-blue"
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