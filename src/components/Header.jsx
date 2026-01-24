import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';
import styles from '../styles/Header.module.css';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Menu', path: '/menu' },
  { label: 'Reservations', path: '/reservations' },
  { label: 'Order Online', path: '/order' },
  { label: 'Login', path: '/login' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main navigation">
        <div className={styles.navContent}>
          {/* Logo */}
          <Link to="/" aria-label="Little Lemon Home">
            <img 
              src={logo} 
              alt="Little Lemon Restaurant" 
              className={styles.logo}
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className={styles.desktopNav}>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`${styles.navLink} ${location.pathname === item.path ? styles.navLinkActive : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className={styles.menuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <ul 
            id="mobile-menu"
            className={styles.mobileNav}
          >
            <div className={styles.mobileNavList}>
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`${styles.mobileNavLink} ${location.pathname === item.path ? styles.mobileNavLinkActive : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </div>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
