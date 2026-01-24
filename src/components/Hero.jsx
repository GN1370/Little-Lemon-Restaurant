import { Link } from 'react-router-dom';
import heroFood from '../assets/hero-food.jpg';
import styles from '../styles/Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Text Content */}
          <div className={styles.content}>
            <h1 id="hero-title" className={styles.title}>Little Lemon</h1>
            <p className={styles.subtitle}>Chicago</p>
            <p className={styles.text}>
              We are a family owned Mediterranean restaurant, focused on traditional 
              recipes served with a modern twist.
            </p>
            <Link to="/reservations" className={styles.button}>
              Reserve a Table
            </Link>
          </div>

          {/* Hero Image */}
          <div className={styles.imageWrapper}>
            <img 
              src={heroFood}
              alt="Delicious Mediterranean bruschetta appetizer"
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
