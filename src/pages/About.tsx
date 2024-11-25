import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-swedish-blue">About Us</h1>
          
          <div className="prose prose-blue max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed">
              Start Sweden is dedicated to simplifying the process of starting and running a business in Sweden. 
              We provide comprehensive guidance and tools to help entrepreneurs navigate the Swedish business landscape.
            </p>

            <h2 className="text-2xl font-semibold text-swedish-blue mt-8 mb-4">Our Mission</h2>
            <p className="text-gray-700">
              Our mission is to make entrepreneurship in Sweden more accessible by providing clear, 
              actionable guidance and tools that help aspiring business owners succeed.
            </p>

            <h2 className="text-2xl font-semibold text-swedish-blue mt-8 mb-4">What We Offer</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Step-by-step guides for business registration</li>
              <li>Interactive business planning tools</li>
              <li>Financial simulators and calculators</li>
              <li>Comprehensive checklists and resources</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;