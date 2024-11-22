import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthForm from "@/components/auth/AuthForm";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <AuthForm />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;