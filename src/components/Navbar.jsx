import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const links = [
    { path: 'responsive-navbar-iceico-task/', name: 'Home' },
    { path: 'responsive-navbar-iceico-task/about', name: 'About' },
    { 
      name: 'Services',
      subLinks: [
        { path: 'responsive-navbar-iceico-task/web-dev', name: 'Web Development' },
        { path: 'responsive-navbar-iceico-task/mobile-dev', name: 'Mobile Development' },
        { path: 'responsive-navbar-iceico-task/cloud', name: 'Cloud Services' },
      ]
    },
    { path: 'responsive-navbar-iceico-task/contact', name: 'Contact' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsServicesOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex-shrink-0 text-white font-bold text-2xl"
          >
            <Link to="/" className="flex items-center">
              <span className="mr-2">🚀</span>
              TechSolutions
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              link.subLinks ? (
                <div 
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <button className="text-white hover:text-purple-200 flex items-center">
                    {link.name}
                    <FiChevronDown className="ml-1" />
                  </button>
                  
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: isServicesOpen ? 1 : 0, y: isServicesOpen ? 0 : -10 }}
                    className="absolute top-8 left-0 bg-white shadow-lg rounded-lg py-2 min-w-[200px]"
                  >
                    {link.subLinks.map((subLink) => (
                      <NavLink
                        key={subLink.path}
                        to={subLink.path}
                        className="block px-4 py-2 text-gray-800 hover:bg-purple-50"
                      >
                        {subLink.name}
                      </NavLink>
                    ))}
                  </motion.div>
                </div>
              ) : (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => 
                    `text-white hover:text-purple-200 ${isActive ? 'border-b-2 border-white' : ''}`
                  }
                >
                  {link.name}
                </NavLink>
              )
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="md:hidden absolute w-full bg-white shadow-lg left-0 right-0"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              {links.map((link) => (
                link.subLinks ? (
                  <div key={link.name} className="border-b">
                    <button 
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className="w-full flex justify-between items-center py-2 text-gray-800 hover:bg-gray-50 px-2"
                    >
                      {link.name}
                      <FiChevronDown className={`transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="pl-4"
                      >
                        {link.subLinks.map((subLink) => (
                          <NavLink
                            key={subLink.path}
                            to={subLink.path}
                            onClick={closeMobileMenu}
                            className="block py-2 text-gray-600 hover:bg-gray-50 rounded px-2"
                          >
                            {subLink.name}
                          </NavLink>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `block py-2 px-2 text-gray-800 hover:bg-gray-50 rounded ${isActive ? 'bg-gray-100' : ''}`
                    }
                  >
                    {link.name}
                  </NavLink>
                )
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;