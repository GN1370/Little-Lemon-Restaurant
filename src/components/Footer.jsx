import { Link } from 'react-router-dom';
import monochromeLogo from '../assets/monochrome-logo.png';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Logo & Info */}
          <div>
            <img 
              src={monochromeLogo} 
              alt="Little Lemon" 
              className={styles.logo}
            />
            <p className={styles.description}>
              A family-owned Mediterranean restaurant in Chicago, serving traditional recipes with a modern twist.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <h3 className={styles.title}>Navigation</h3>
            <ul className={styles.linkList}>
              <li><Link to="/" className={styles.link}>Home</Link></li>
              <li><Link to="/about" className={styles.link}>About</Link></li>
              <li><Link to="/menu" className={styles.link}>Menu</Link></li>
              <li><Link to="/reservations" className={styles.link}>Reservations</Link></li>
              <li><Link to="/order" className={styles.link}>Order Online</Link></li>
              <li><Link to="/login" className={styles.link}>Login</Link></li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className={styles.title}>Contact</h3>
            <address className={styles.address}>
              <p>123 Lemon Street</p>
              <p>Chicago, IL 60601</p>
              <p>
                <a href="tel:+13125551234" className={styles.link}>(312) 555-1234</a>
              </p>
              <p>
                <a href="mailto:info@littlelemon.com" className={styles.link}>info@littlelemon.com</a>
              </p>
            </address>
          </div>

          {/* Hours */}
          <div>
            <h3 className={styles.title}>Hours</h3>
            <ul className={styles.hours}>
              <li>Monday - Friday: 11am - 10pm</li>
              <li>Saturday: 10am - 11pm</li>
              <li>Sunday: 10am - 9pm</li>
            </ul>
          </div>
        </div>

        <div className={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} Little Lemon Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
