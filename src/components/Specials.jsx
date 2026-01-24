import { Link } from 'react-router-dom';
import MenuCard from './MenuCard';
import greekSalad from '../assets/greek-salad.jpg';
import bruschetta from '../assets/bruschetta.jpg';
import lemonDessert from '../assets/lemon-dessert.jpg';
import styles from '../styles/Specials.module.css';

const specials = [
  {
    id: 1,
    title: 'Greek Salad',
    price: '$12.99',
    description: 'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
    image: greekSalad,
  },
  {
    id: 2,
    title: 'Bruschetta',
    price: '$5.99',
    description: 'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.',
    image: bruschetta,
  },
  {
    id: 3,
    title: 'Lemon Dessert',
    price: '$5.00',
    description: "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
    image: lemonDessert,
  },
];

const Specials = () => {
  return (
    <section className={styles.section} aria-labelledby="specials-title">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 id="specials-title" className={styles.title}>This Week's Specials!</h2>
          <Link to="/menu" className={styles.menuButton}>
            Online Menu
          </Link>
        </div>

        {/* Cards Grid */}
        <div className={styles.grid}>
          {specials.map((item) => (
            <MenuCard
              key={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specials;
