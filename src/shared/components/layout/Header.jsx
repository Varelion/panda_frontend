import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ChevronDown, Menu, X, MapPin, ShoppingBag, User } from 'lucide-react';
import { selectCartCount, selectCartTotal, selectDeliveryLocation } from '../../../features/cart';
import { selectIsAuthenticated, selectUser, setCredentials } from '../../../features/auth';
import { useDispatch } from 'react-redux';
import { setShowMenuModal } from '../../../features/ui/uiSlice'; // ✅ import from UI slice
import { UserAccountModal } from '../../../features/user';
import { getProfile } from '../../../shared/utils/auth';

import logo from '../../../assets/logo.png';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const dispatch = useDispatch(); // ✅ get Redux dispatcher

  // Get cart state from Redux
  const cartCount = useSelector(selectCartCount);
  const cartTotal = useSelector(selectCartTotal);
  const cartLocation = useSelector(selectDeliveryLocation);

  // Get auth state from Redux
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  // Load user profile on component mount if token exists
  useEffect(() => {
    const loadUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (token && !user) {
        try {
          const response = await getProfile();
          dispatch(setCredentials({
            user: response.user,
            token: token,
          }));
        } catch (error) {
          console.error('Failed to load user profile:', error);
          localStorage.removeItem('token');
        }
      }
    };

    loadUserProfile();
  }, [dispatch, user]);

  const navigationItems = [
    {
      label: 'Our Food',
      href: '/our-food',
      submenu: [
        { label: 'Order Now', href: '/?showMenu=true' },
        { label: 'Philosophy', href: '/our-food-philosophy' },
      ],
    },
    {
      label: 'Our people',
      href: '/our-people',
      submenu: [
        // { label: 'Family', href: '/our-family' },
        { label: 'Staff', href: '/our-staff' },
        // { label: 'Community', href: 'https://community.pandaexpress.com/' },
        { label: 'Panda Cares', href: 'https://www.pandacares.org/' },
        // { label: 'Panda CommUnity Fund', href: '/unity' },
      ],
    },
    // {
    //   label: 'Our Shop',
    //   href: '/our-shop',
    //   submenu: [
    //     { label: 'Gift Cards', href: '/gift-cards' },
    //     { label: 'Swag Shop', href: 'https://shop.pandaexpress.com/' },
    //   ],
    // },
    {
      label: 'Our Rewards',
      href: '/rewards',
    },
    {
      label: 'Join Our Family',
      href: '/signup',
      submenu: [
        { label: 'Sign Up', href: '/signup' },
        { label: 'Discord', href: import.meta.env.VITE_DISCORD_INVITE_URL },
      ],
    },
    {
      label: 'About',
      href: '/About',
      submenu: [
        { label: 'About Us', href: '/About' },
        { label: 'Contact Us', href: '/contact-us' },
        { label: 'Feedback', href: '/Feedback' },
      ],
    },
  ];

  const PandaLogo = ({ size = 60 }) => (
    <div
      className="bg-white absolute rounded-full flex items-center justify-center translate-y-[-5px] top-2.5"
      style={{ width: size, height: size }}
    >
      <img
        src={logo}
        alt="Panda Express Logo"
        className="object-contain max-w-[120%] max-h-[120%]"
      />
    </div>
  );

  const handleDropdownEnter = (index) => {
    setActiveDropdown(index);
  };

  const handleCartClick = (event) => {
    event.preventDefault();

    // ✅ Set Redux flag to open the modal
    dispatch(setShowMenuModal(true));

    // ✅ Update the URL without reload
    const url = new URL(window.location);
    url.searchParams.set('showMenu', 'true');
    window.history.pushState({}, '', url);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <header role="banner" className="bg-[#d1282e] h-[70px] text-white relative z-50 flex">
      <style>{`
        .nav-item {
          position: relative;
        }
        .nav-item::after {
          content: '';
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 2.1px;
          height: 20px;
          background-color: black;
        }
        .nav-item:last-child::after {
          display: none;
        }
      `}</style>
      <div className="flex justify-start items-center  px-4 w-full  min-w-[100vw] ">
        {/* Logo and Brand */}
        <div className="flex items-center">
          <h1 className="sr-only">Panda Express</h1>
          <a href="/" className="flex items-center mr-5" aria-label="Panda Express Home">
            <PandaLogo />
            <div className="min-w-11"> </div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block" aria-label="Main navigation">
          <ul className="flex items-center">
            {navigationItems.map((item, index) => (
              <li key={index} className="nav-item">
                {item.submenu ? (
                  <div
                    // MAIN DROPDOWN CONTAINER - Extends hover area and positions dropdown
                    className="relative "
                    onMouseEnter={() => handleDropdownEnter(index)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    {/* NAVIGATION BUTTON */}
                    <button
                      className="flex items-center space-x-1 px-3 py-2 rounded transition-colors font-bold text-lg"
                      aria-expanded={activeDropdown === index}
                      aria-haspopup="true"
                    >
                      <span>{item.label}</span>
                    </button>

                    {/* INVISIBLE BRIDGE AREA - Fills gap between button and dropdown */}
                    {/* This creates a hover-safe zone from button to the 81px dropdown position */}
                    <div className="absolute top-full left-0 w-full bg-transparent pointer-events-auto" />

                    {/* INVISIBLE SIDE EXTENSIONS - Adds horizontal tolerance */}
                    {/* Left side extension - 32px tolerance */}
                    <div className="absolute top-full -left-8 w-8 bg-transparent pointer-events-auto" />
                    {/* Right side extension - 32px tolerance */}
                    <div className="absolute top-full -right-8 w-8 bg-transparent pointer-events-auto" />

                    {/* DROPDOWN MENU - Positioned exactly 81px from header top */}
                    {activeDropdown === index && (
                      <div className="absolute !top-[45px] left-0 bg-white text-black shadow-lg min-w-48 z-1 mt-3">
                        {/* INVISIBLE DROPDOWN PADDING - Extends hover area around the dropdown */}
                        {/* Top padding - extends upward */}
                        <div className="absolute bottom-full left-0 w-full h-4 bg-transparent pointer-events-auto" />
                        {/* Left padding - extends leftward */}
                        <div className="absolute top-0 -left-4 w-4 h-full bg-transparent pointer-events-auto" />
                        {/* Right padding - extends rightward */}
                        <div className="absolute top-0 -right-4 w-4 h-full bg-transparent pointer-events-auto" />
                        {/* Bottom padding - extends downward */}
                        <div className="absolute top-full left-0 w-full h-4 bg-transparent pointer-events-auto" />

                        <ul className="py-2">
                          {item.submenu.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <a
                                href={subItem.href}
                                className="block px-4 py-2 hover:bg-gray-100 transition-colors hover:text-red-500 font-bold text-lg"
                              >
                                {subItem.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="block px-3 py-2 rounded transition-colors font-bold text-lg"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Items */}
        <div className="flex items-center space-x-4 !ml-auto">
          {/* Location */}
          <a
            // href="/location"
            className="hidden md:flex items-center space-x-2 px-3 py-2 rounded transition-colors "
            aria-label={cartLocation.map || 'Unspecified Location'}
            aria-disabled={true}
          >
            <MapPin className="w-5 h-5" />
            <div className="text-left">
              <div className="text-xs opacity-120">Pickup at</div>
              <div className="text-sm font-medium">
                <span>{cartLocation.map || 'Unspecified Location'}</span> (
                <span>{cartLocation.x || 'X'}</span>, <span>{cartLocation.y || 'Y'}</span>)
              </div>
            </div>
          </a>

          {/* Cart */}
          <a
            href="/order/my-bag" // keep for accessibility / fallback
            onClick={handleCartClick}
            className="flex items-center space-x-2 px-3 py-2 rounded transition-colors"
            aria-label={`Shopping bag: ${cartCount} items, ${cartTotal} gold total`}
          >
            <div className="relative">
              <ShoppingBag className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold ">
                {cartCount}
              </span>
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-sm font-medium">My Bag</div>
              <div className="text-xs">{cartTotal} Gold</div>
            </div>
          </a>

          {/* Order Button */}
          <a
            href="/?showMenu=true"
            className="bg-yellow-400 text-black px-4 py-2 rounded font-bold text-lg hover:bg-yellow-300 transition-colors"
          >
            Order
          </a>

          {/* User Account */}
          <button
            onClick={() => setShowAccountModal(true)}
            className="flex items-center space-x-2 p-2 rounded hover:bg-red-700 transition-colors"
            id='userAccount'
            aria-label="User account menu"
          >
            <User className="w-6 h-6" />
            {isAuthenticated && user && (
              <div className="hidden sm:block text-left">
                <div className="text-sm font-medium">{user.username}</div>
                <div className="text-xs opacity-80">
                  {user.isAdmin ? 'Admin' : 'User'}
                </div>
              </div>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded hover:bg-red-700 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="lg:hidden border-t border-red-500" aria-label="Mobile navigation">
          <ul className="py-4 space-y-2">
            {navigationItems.map((item, index) => (
              <li key={index} className="">
                <a
                  href={item.href}
                  className="block px-4 py-2 hover:bg-red-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
                {item.submenu && (
                  <ul className="ml-4 mt-2 space-y-1">
                    {item.submenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <a
                          href={subItem.href}
                          className="block px-4 py-1 text-sm opacity-90 hover:bg-red-700 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* User Account Modal */}
      <UserAccountModal
        isOpen={showAccountModal}
        onClose={() => setShowAccountModal(false)}
      />
    </header>
  );
}

export default Header;
