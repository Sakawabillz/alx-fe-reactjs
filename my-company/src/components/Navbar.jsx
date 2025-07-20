import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ 
      backgroundColor: '#333', 
      padding: '1rem',
      marginBottom: '20px'
    }}>
      <ul style={{ 
        listStyle: 'none', 
        display: 'flex', 
        gap: '20px', 
        margin: 0, 
        padding: 0 
      }}>
        <li>
          <Link 
            to="/" 
            style={{ 
              color: 'white', 
              textDecoration: 'none',
              padding: '10px 15px',
              borderRadius: '5px',
              transition: 'background-color 0.3s'
            }}
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="/about" 
            style={{ 
              color: 'white', 
              textDecoration: 'none',
              padding: '10px 15px',
              borderRadius: '5px',
              transition: 'background-color 0.3s'
            }}
          >
            About
          </Link>
        </li>
        <li>
          <Link 
            to="/services" 
            style={{ 
              color: 'white', 
              textDecoration: 'none',
              padding: '10px 15px',
              borderRadius: '5px',
              transition: 'background-color 0.3s'
            }}
          >
            Services
          </Link>
        </li>
        <li>
          <Link 
            to="/contact" 
            style={{ 
              color: 'white', 
              textDecoration: 'none',
              padding: '10px 15px',
              borderRadius: '5px',
              transition: 'background-color 0.3s'
            }}
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
