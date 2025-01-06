import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { PaymentElement } from "@/components/payment/PaymentElement";

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-accent via-white to-transparent py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <div className="relative group backdrop-blur-sm bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgb(0,106,167,0.2)] transition-all duration-500 before:absolute before:inset-0 before:rounded-2xl before:transition-all before:duration-500 before:opacity-0 before:bg-gradient-to-r before:from-swedish-blue/5 before:via-accent/10 before:to-swedish-yellow/5 group-hover:before:opacity-100 before:animate-pulse">
            <div className="absolute inset-[-2px] bg-gradient-to-r from-swedish-blue/10 via-accent/5 to-swedish-yellow/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-all duration-500 group-hover:scale-105"></div>
            <div className="relative">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-swedish-blue to-swedish-blue/80 bg-clip-text text-transparent mb-6 [text-shadow:_0_2px_4px_rgb(0_0_0_/_5%)] transform transition-all duration-300 group-hover:scale-[1.02] group-hover:[text-shadow:_0_4px_8px_rgb(0,106,167,0.2)]">
                Find the Perfect SNI Code for Your Business
                <Search className="inline-block w-8 h-8 ml-2 text-swedish-yellow animate-pulse" />
              </h1>
              <p className="text-xl text-gray-600 mb-8 [text-shadow:_0_1px_2px_rgb(0_0_0_/_5%)] transform transition-all duration-300 group-hover:translate-y-[-2px] group-hover:text-gray-700">
                Easily search and find the right SNI code for your Swedish company.
                Our smart search helps you navigate through all industry classifications.
              </p>
              <div className="space-y-8">
                <PaymentElement />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;