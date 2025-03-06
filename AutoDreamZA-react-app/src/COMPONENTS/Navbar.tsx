import React from 'react';
import styles from './Nav.module.css';
import { links } from './links.json';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

type LinkType = {
  label: string;
  href: string;
};

console.log(styles);
const Links: React.FC<{ links: LinkType[] }> = ({ links }) => {
  return (
    <div className={styles['links-container']}>
      {links.map((link: LinkType) => {
        return (
          <div key={link.href} className={styles['link']}>
            <Link to={link.href} className={styles.link}>
              {link.label}
            </Link>
          </div>
        );
      })}
    </div>
  );
};


const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <Links links={links} />
    </nav>
  );
};

export default Navbar;