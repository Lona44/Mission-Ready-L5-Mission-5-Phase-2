/**
 * SecondaryNavbar Component

 */

import { Link } from 'react-router-dom';
import './SecondaryNavbar.css';

export default function SecondaryNavbar() {
  const categories = [
    { name: 'Browse Marketplace', path: '/marketplace' },
    { name: 'Stores', path: '/stores' },
    { name: 'Deals', path: '/deals' },
    { name: 'Book a courier', path: '/courier' },
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
          List an item
        </Link>
      </div>
    </nav>
  );
}