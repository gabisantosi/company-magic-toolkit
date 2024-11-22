const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-md shadow-[0_-2px_15px_-3px_rgba(0,106,167,0.1),0_-10px_20px_-2px_rgba(0,106,167,0.04)] relative border-t border-swedish-blue/10">
      <div className="absolute inset-0 bg-gradient-to-r from-swedish-blue/5 to-swedish-yellow/5 opacity-50"></div>
      <div className="container mx-auto px-4 py-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-swedish-blue mb-4">SwedishStartup</h3>
            <p className="text-gray-600">
              Making company registration in Sweden simple and accessible.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-swedish-blue mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-swedish-blue transition-colors duration-300 hover:-translate-y-0.5 inline-flex">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-swedish-blue transition-colors duration-300 hover:-translate-y-0.5 inline-flex">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-swedish-blue transition-colors duration-300 hover:-translate-y-0.5 inline-flex">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-swedish-blue mb-4">Contact</h4>
            <p className="text-gray-600">
              Email: contact@swedishstartup.com
              <br />
              Phone: +46 XX XXX XX XX
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200/50 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} SwedishStartup. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;