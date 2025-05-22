import { useState, useCallback, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Activity } from "lucide-react";

const links = [
  { path: "/responsive-navbar-iceico-task/", name: "Home" },
  { path: "/responsive-navbar-iceico-task/about", name: "About" },
  {
    name: "Services",
    subLinks: [
      {
        path: "/responsive-navbar-iceico-task/web-dev",
        name: "Web Development",
      },
      {
        path: "/responsive-navbar-iceico-task/mobile-dev",
        name: "Mobile Development",
      },
      { path: "/responsive-navbar-iceico-task/cloud", name: "Cloud Services" },
    ],
  },
  { path: "/responsive-navbar-iceico-task/contact", name: "Contact" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesTimeoutRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".navbar-container")) {
        setIsMobileMenuOpen(false);
        setIsServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
    setIsServicesOpen(false);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, []);

  const handleServicesMouseEnter = useCallback(() => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
    }
    setIsServicesOpen(true);
  }, []);

  const handleServicesMouseLeave = useCallback(() => {
    servicesTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 150);
  }, []);

  const toggleServicesDropdown = useCallback(() => {
    setIsServicesOpen((prev) => !prev);
  }, []);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
  };

  const DesktopMenu = () => (
    <div className="hidden md:flex items-center space-x-1">
      {links.map((link) =>
        link.subLinks ? (
          <div
            key={link.name}
            className="relative"
            onMouseEnter={handleServicesMouseEnter}
            onMouseLeave={handleServicesMouseLeave}
          >
            <Link
              to={link.path}
              className="text-white hover:text-yellow-300 hover:bg-white/10 flex items-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 rounded-lg px-4 py-2 font-medium no-underline"
              aria-expanded={isServicesOpen}
              aria-haspopup="true"
              style={{ textDecoration: "none", color: "white" }}
            >
              {link.name}
              <FiChevronDown
                className={`ml-2 transition-transform duration-200 ${
                  isServicesOpen ? "rotate-180" : ""
                }`}
              />
            </Link>

            <AnimatePresence>
              {isServicesOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 bg-white shadow-xl rounded-lg py-2 min-w-52 z-50 border border-gray-200"
                >
                  {link.subLinks.map((subLink) => (
                    <NavLink
                      key={subLink.path}
                      to={subLink.path}
                      className={({ isActive }) =>
                        `block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 font-medium border-l-4 border-transparent hover:border-blue-500 no-underline ${
                          isActive
                            ? "bg-blue-100 text-blue-700 border-blue-600"
                            : ""
                        }`
                      }
                      style={{ textDecoration: "none"}}
                    >
                      {subLink.name}
                    </NavLink>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `text-white hover:text-yellow-300 hover:bg-white/10 transition-all duration-200 px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-white/30 no-underline ${
                isActive
                  ? "text-white underline! decoration-2 underline-offset-4 decoration-white"
                  : ""
              }`
            }
            style={{ textDecoration: "none", color: "white" }}
          >
            {link.name}
          </NavLink>
        )
      )}
    </div>
  );

  const MobileMenu = () => (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          variants={mobileMenuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl z-40 overflow-hidden border-t border-gray-200"
        >
          <div className="px-4 py-6 space-y-2">
            {links.map((link) =>
              link.subLinks ? (
                <div
                  key={link.name}
                  className="border-b border-gray-100 last:border-b-0 pb-2"
                >
                  <button
                    onClick={toggleServicesDropdown}
                    className="w-full flex justify-between items-center py-3 text-gray-800 hover:bg-gray-100 hover:text-blue-600 px-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 font-medium"
                    aria-expanded={isServicesOpen}
                  >
                    <span>{link.name}</span>
                    <FiChevronDown
                      className={`transition-transform duration-200 text-gray-500 ${
                        isServicesOpen ? "rotate-180 text-blue-600" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 ml-4 space-y-1 overflow-hidden"
                      >
                        {link.subLinks.map((subLink) => (
                          <NavLink
                            key={subLink.path}
                            to={subLink.path}
                            onClick={closeMobileMenu}
                            className={({ isActive }) =>
                              `block py-3 px-4 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200 border-l-4 border-transparent hover:border-blue-500 no-underline ${
                                isActive
                                  ? "bg-blue-100 text-blue-700 border-blue-600 font-medium"
                                  : ""
                              }`
                            }
                            style={{ textDecoration: "none" }}
                          >
                            {subLink.name}
                          </NavLink>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `block py-3 px-3 text-gray-800 hover:bg-gray-100 hover:text-blue-600 rounded-lg transition-all duration-200 font-medium no-underline ${
                      isActive
                        ? "bg-blue-100 text-blue-700 border-l-4 border-blue-600"
                        : ""
                    }`
                  }
                  style={{ textDecoration: "none" }}
                >
                  {link.name}
                </NavLink>
              )
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg relative navbar-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex-shrink-0"
          >
            <Link
              to="/responsive-navbar-iceico-task/"
              className="flex items-center space-x-3 text-white font-bold text-xl md:text-2xl hover:text-yellow-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 rounded-lg px-2 py-1 no-underline"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Activity className="text-2xl" />
              <span>TechSolutions</span>
            </Link>
          </motion.div>

          <DesktopMenu />

          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.div>
          </button>
        </div>
      </div>

      <MobileMenu />
    </nav>
  );
};

export default Navbar;
