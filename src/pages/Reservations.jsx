import Header from '../components/Header';
import Footer from '../components/Footer';
import BookingForm from '../components/BookingForm';
import styles from '../styles/pages/Reservations.module.css';

const Reservations = () => {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContainer}>
            <h1 className={styles.heroTitle}>Reservations</h1>
            <p className={styles.heroSubtitle}>Book Your Table</p>
          </div>
        </section>

        {/* Booking Form */}
        <section className={styles.formSection} aria-labelledby="booking-form">
          <div className={styles.formContainer}>
            <BookingForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Reservations;
