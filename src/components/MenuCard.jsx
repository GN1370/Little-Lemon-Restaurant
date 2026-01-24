import { Truck } from 'lucide-react';
import styles from '../styles/MenuCard.module.css';

const MenuCard = ({ title, price, description, image }) => {
  return (
    <article className={styles.card}>
      <img 
        src={image} 
        alt={title}
        className={styles.image}
      />
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.price}>{price}</span>
        </div>
        <p className={styles.description}>
          {description}
        </p>
        <button className={styles.orderButton}>
          Order a delivery
          <Truck size={20} className={styles.orderIcon} />
        </button>
      </div>
    </article>
  );
};

export default MenuCard;
