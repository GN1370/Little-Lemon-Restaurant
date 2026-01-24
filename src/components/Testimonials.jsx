import { Star } from 'lucide-react';
import styles from '../styles/Testimonials.module.css';

const testimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    rating: 5,
    text: 'Amazing Mediterranean food! The Greek salad was fresh and delicious. Will definitely come back!',
  },
  {
    id: 2,
    name: 'John D.',
    rating: 5,
    text: 'Best bruschetta in Chicago. The atmosphere is cozy and the staff is incredibly friendly.',
  },
  {
    id: 3,
    name: 'Emily R.',
    rating: 5,
    text: 'The lemon dessert is to die for! Perfect ending to a wonderful meal.',
  },
  {
    id: 4,
    name: 'Michael T.',
    rating: 4,
    text: 'Great food and excellent service. The reservation process was smooth and easy.',
  },
];

const Testimonials = () => {
  return (
    <section className={styles.section} aria-labelledby="testimonials-title">
      <div className={styles.container}>
        <h2 id="testimonials-title" className={styles.title}>
          Testimonials
        </h2>

        <div className={styles.grid}>
          {testimonials.map((testimonial) => (
            <article key={testimonial.id} className={styles.card}>
              {/* Rating */}
              <div className={styles.rating} aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={`${styles.star} ${i < testimonial.rating ? styles.starFilled : styles.starEmpty}`}
                  />
                ))}
              </div>

              {/* Name */}
              <h3 className={styles.name}>{testimonial.name}</h3>

              {/* Review Text */}
              <p className={styles.text}>
                "{testimonial.text}"
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
