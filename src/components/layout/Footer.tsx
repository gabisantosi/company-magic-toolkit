const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
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
            <p className="text-gray-600">
              Email: contact@swedishstartup.com
              <br />
              Phone: +46 XX XXX XX XX
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} SwedishStartup. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;