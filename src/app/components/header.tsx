import React from 'react';
import styles from './chat.module.css';

const Header: React.FC = () => {
  return (
    <div className={styles.stickyHeader}>

      {/* Navbar Left */}


      <nav className={styles.navbarLeft}>
        <img src="/icon.svg" alt="Logo" className={styles.logo} />
        <ul className={styles.navbarList}>
          <li className={styles.navbarItem}>
            <a href="#" className={styles.navbarLink}>For business</a>
          </li>
        </ul>
      </nav>

      <h1 className={styles.header}>
        FinDY
      </h1>

      {/* Navbar Right */}
      <nav className={styles.navbarRight}>
        <ul className={styles.navbarList}>
          <li className={styles.navbarItem}>
            <a href="#" className={styles.navbarLink}>Sign up</a>
          </li>
        </ul>
      </nav>

    </div>
  )
}

export default Header;
