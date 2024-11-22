const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-bold text-swedish-blue mb-4">SwedishStartup</h3>
            <p className="text-gray-600 leading-relaxed">
              Making company registration in Sweden simple and accessible.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-swedish-blue mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-swedish-blue transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-swedish-blue transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-swedish-blue transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-swedish-blue mb-4">Contact</h4>
            <p className="text-gray-600 leading-relaxed">
              Email: contact@swedishstartup.com
              <br />
              Phone: +46 XX XXX XX XX
            </p>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-100 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} SwedishStartup. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;