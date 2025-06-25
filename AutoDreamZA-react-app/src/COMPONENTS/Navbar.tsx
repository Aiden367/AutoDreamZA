import React, { useState } from 'react';
import styles from './Nav.module.css';
import { links } from './links.json';
import { Link } from 'react-router-dom';

type LinkType = {
  label: string;
  href: string;
  submenu?: { label: string; href: string }[]; // Add submenu support
};

const Links: React.FC<{ links: LinkType[] }> = ({ links }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <div className={styles['links-container']}>
      {links.map((link: LinkType) => (
        <div
          key={link.href}
          className={styles['nav-item']}
          onMouseEnter={() => toggleDropdown(link.label)}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <div className={styles['link-container']}>
            <Link to={link.href} className={styles.link}>
              {link.label}
            </Link>
          </div>

          {/* Dropdown Menu */}
          {link.submenu && openDropdown === link.label && (
            <div className={styles['dropdown-menu']}>
              {link.submenu.map((sublink) => (
                <Link
                  key={sublink.href}
                  to={sublink.href}
                  className={styles['dropdown-link']}
                >
                  {sublink.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
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
