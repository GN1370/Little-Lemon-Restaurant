import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/pages/ConfirmedBooking.module.css';

const ConfirmedBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    // Try to get booking data from navigation state first
    if (location.state) {
      setBooking(location.state);
    } else {
      // Fallback to localStorage
      const savedBooking = localStorage.getItem('latestBooking');
      if (savedBooking) {
        setBooking(JSON.parse(savedBooking));
      } else {
        // No booking found, redirect to reservations
        navigate('/reservations');
      }
    }
  }, [location.state, navigate]);

  if (!booking) {
    return null;
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContainer}>
            <h1 className={styles.heroTitle}>Reservation Confirmed</h1>
            <p className={styles.heroSubtitle}>Thank You!</p>
          </div>
        </section>

        {/* Confirmation Details */}
        <section className={styles.section} aria-labelledby="confirmation-title">
          <div className={styles.container}>
            <div className={styles.card}>
              {/* Success Icon */}
              <div className={styles.cardHeader}>
                <CheckCircle className={styles.checkIcon} size={32} aria-hidden="true" />
                <h2 id="confirmation-title" className={styles.cardTitle}>
                  RESERVATION CONFIRMED
                </h2>
              </div>

              {/* Booking Details */}
              <dl className={styles.details}>
                <div className={styles.detailRow}>
                  <dt className={styles.detailLabel}>Confirmation #:</dt>
                  <dd className={styles.detailValue}>{booking.confirmationNumber}</dd>
                </div>
                <div className={styles.detailRow}>
                  <dt className={styles.detailLabel}>Date:</dt>
                  <dd className={styles.detailValue}>{formatDate(booking.date)}</dd>
                </div>
                <div className={styles.detailRow}>
                  <dt className={styles.detailLabel}>Time:</dt>
                  <dd className={styles.detailValue}>{booking.time}</dd>
                </div>
                <div className={styles.detailRow}>
                  <dt className={styles.detailLabel}>Diners:</dt>
                  <dd className={styles.detailValue}>{booking.guests}</dd>
                </div>
                <div className={styles.detailRow}>
                  <dt className={styles.detailLabel}>Name:</dt>
                  <dd className={styles.detailValue}>{booking.firstName} {booking.lastName}</dd>
                </div>
                <div className={styles.detailRow}>
                  <dt className={styles.detailLabel}>Phone:</dt>
                  <dd className={styles.detailValue}>{booking.phone}</dd>
                </div>
                <div className={styles.detailRow}>
                  <dt className={styles.detailLabel}>Seating:</dt>
                  <dd className={`${styles.detailValue} ${styles.capitalize}`}>{booking.seating}</dd>
                </div>
                {booking.occasion && (
                  <div className={styles.detailRow}>
                    <dt className={styles.detailLabel}>Occasion:</dt>
                    <dd className={`${styles.detailValue} ${styles.capitalize}`}>{booking.occasion}</dd>
                  </div>
                )}
              </dl>

              {/* Actions */}
              <div className={styles.actions}>
                <Link to="/" className={styles.buttonPrimary}>
                  Done
                </Link>
                <Link to="/reservations" className={styles.buttonSecondary}>
                  Make Another Reservation
                </Link>
              </div>
            </div>

            {/* Additional Info */}
            <div className={styles.additionalInfo}>
              <p>
                A confirmation email has been sent to your email address. 
                Please arrive 10 minutes before your reservation time.
              </p>
              <p style={{ marginTop: '1rem' }}>
                For any changes or cancellations, please call us at{' '}
                <a href="tel:+13125551234" className={styles.phoneLink}>
                  (312) 555-1234
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ConfirmedBooking;
