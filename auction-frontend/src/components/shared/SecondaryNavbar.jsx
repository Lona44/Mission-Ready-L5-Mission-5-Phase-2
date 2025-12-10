/**
 * SecondaryNavbar Component

 */

import { Link } from 'react-router-dom';
import './SecondaryNavbar.css';

export default function SecondaryNavbar() {
  const categories = [
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Property', path: '/marketplace?category=Property' },
    { name: 'Motors', path: '/marketplace?category=Motors' },
    { name: 'Jobs', path: '/marketplace?category=Jobs' },
    { name: 'Services', path: '/marketplace?category=Services' },
  ];

  return (
    <nav className="secondary-navbar">
      <div className="secondary-navbar__container">
        <div className="secondary-navbar__links">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="secondary-navbar__link"
            >
              {category.name}
            </Link>
          ))}
        </div>
        
        <Link to="/stores" className="secondary-navbar__link secondary-navbar__link--stores">
          Stores
        </Link>
      </div>
    </nav>
  );
}