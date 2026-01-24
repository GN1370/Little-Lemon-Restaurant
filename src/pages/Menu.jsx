import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import greekSalad from '../assets/greek-salad.jpg';
import bruschetta from '../assets/bruschetta.jpg';
import lemonDessert from '../assets/lemon-dessert.jpg';
import grilledFish from '../assets/grilled-fish.jpg';
import styles from '../styles/pages/Menu.module.css';

const menuItems = [
  {
    id: 1,
    name: 'Greek Salad',
    description: 'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
    price: '$12.99',
    category: 'Starters',
    image: greekSalad,
  },
  {
    id: 2,
    name: 'Bruschetta',
    description: 'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.',
    price: '$5.99',
    category: 'Starters',
    image: bruschetta,
  },
  {
    id: 3,
    name: 'Grilled Fish',
    description: 'Fresh Mediterranean sea bass grilled to perfection, served with roasted vegetables and lemon herb sauce.',
    price: '$18.99',
    category: 'Mains',
    image: grilledFish,
  },
  {
    id: 4,
    name: 'Lemon Dessert',
    description: "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
    price: '$5.00',
    category: 'Desserts',
    image: lemonDessert,
  },
];

const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'];

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContainer}>
            <h1 className={styles.heroTitle}>Our Menu</h1>
            <p className={styles.heroSubtitle}>Mediterranean Delights</p>
          </div>
        </section>

        {/* Menu Content */}
        <section className={styles.contentSection} aria-labelledby="menu-title">
          <div className={styles.container}>
            {/* Category Filter */}
            <nav className={styles.categoryNav} aria-label="Menu categories">
              <ul className={styles.categoryList}>
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => setActiveCategory(category)}
                      className={`${styles.categoryButton} ${
                        activeCategory === category ? styles.categoryButtonActive : ''
                      }`}
                      aria-pressed={activeCategory === category}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Menu Grid */}
            <div className={styles.menuGrid}>
              {filteredItems.map((item) => (
                <article 
                  key={item.id} 
                  className={styles.menuItem}
                >
                  <img 
                    src={item.image}
                    alt={item.name}
                    className={styles.menuItemImage}
                  />
                  <div className={styles.menuItemContent}>
                    <div className={styles.menuItemHeader}>
                      <h3 className={styles.menuItemTitle}>{item.name}</h3>
                      <span className={styles.menuItemPrice}>{item.price}</span>
                    </div>
                    <p className={styles.menuItemDescription}>
                      {item.description}
                    </p>
                    <span className={styles.menuItemCategory}>
                      {item.category}
                    </span>
                  </div>
                </article>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <p className={styles.emptyState}>
                No items found in this category.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default MenuPage;
