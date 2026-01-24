import Header from '../components/Header';
import Footer from '../components/Footer';
import ownersImage from '../assets/owners.jpg';
import styles from '../styles/pages/About.module.css';

const About = () => {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContainer}>
            <h1 className={styles.heroTitle}>About Us</h1>
            <p className={styles.heroSubtitle}>Our Story</p>
          </div>
        </section>

        {/* About Content */}
        <section className={styles.contentSection} aria-labelledby="about-story">
          <div className={styles.container}>
            <div className={styles.grid}>
              <div>
                <h2 id="about-story" className={styles.sectionTitle}>
                  Little Lemon
                </h2>
                <p className={styles.sectionSubtitle}>Chicago</p>
                
                <div className={styles.textContent}>
                  <p>
                    Little Lemon is a charming neighborhood bistro that serves simple food 
                    and classic cocktails in a lively but casual environment. The restaurant 
                    features a locally-sourced menu with daily specials.
                  </p>
                  <p>
                    Founded in 2010 by Mario and Adrian, two brothers with a passion for 
                    Mediterranean cuisine, Little Lemon has become a beloved fixture in 
                    Chicago's culinary scene.
                  </p>
                  <p>
                    Our menu draws inspiration from Italian, Greek, and Turkish traditions, 
                    featuring recipes passed down through generations of our family. Every 
                    dish is prepared with the freshest ingredients and authentic techniques.
                  </p>
                  <p>
                    Whether you're joining us for a casual lunch, a romantic dinner, or a 
                    celebration with family and friends, we promise an unforgettable 
                    Mediterranean dining experience.
                  </p>
                </div>
              </div>

              <div>
                <img 
                  src={ownersImage}
                  alt="Mario and Adrian, the founders of Little Lemon restaurant"
                  className={styles.image}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className={styles.valuesSection} aria-labelledby="our-values">
          <div className={styles.container}>
            <h2 id="our-values" className={styles.valuesTitle}>
              Our Values
            </h2>
            
            <div className={styles.valuesGrid}>
              <article className={styles.valueCard}>
                <h3 className={styles.valueTitle}>Quality</h3>
                <p className={styles.valueText}>
                  We source only the finest ingredients from local farmers and suppliers 
                  to ensure every dish meets our high standards.
                </p>
              </article>

              <article className={styles.valueCard}>
                <h3 className={styles.valueTitle}>Tradition</h3>
                <p className={styles.valueText}>
                  Our recipes are inspired by generations of Mediterranean cooking, 
                  honoring the authentic flavors and techniques of our heritage.
                </p>
              </article>

              <article className={styles.valueCard}>
                <h3 className={styles.valueTitle}>Hospitality</h3>
                <p className={styles.valueText}>
                  We treat every guest like family, creating a warm and welcoming 
                  atmosphere that makes you feel right at home.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
