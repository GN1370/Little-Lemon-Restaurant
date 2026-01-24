import ownersImage from '../assets/owners.jpg';
import styles from '../styles/AboutSection.module.css';

const AboutSection = () => {
  return (
    <section className={styles.section} aria-labelledby="about-title">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Text Content */}
          <div className={styles.content}>
            <h2 id="about-title" className={styles.title}>Little Lemon</h2>
            <p className={styles.subtitle}>Chicago</p>
            <div className={styles.textContent}>
              <p className={styles.text}>
                Little Lemon is a charming neighborhood bistro that serves simple food 
                and classic cocktails in a lively but casual environment.
              </p>
              <p className={styles.text}>
                The restaurant features a locally-sourced menu with daily specials. 
                Our cuisine is inspired by Italian, Greek, and Turkish culture.
              </p>
              <p className={styles.text}>
                Based on traditional family recipes passed down from generation to 
                generation, Little Lemon offers a taste of the Mediterranean with 
                every dish.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className={styles.imageWrapper}>
            <img 
              src={ownersImage}
              alt="Mario and Adrian, owners of Little Lemon restaurant"
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
