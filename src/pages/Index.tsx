import { useSession } from "@supabase/auth-helpers-react";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Index = () => {
  const session = useSession();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;