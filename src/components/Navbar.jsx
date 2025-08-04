import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ isAuthenticated, user, onLogout }) => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          🖥️ TechStore - Equipos Informáticos
        </Link>
        
        <ul className="navbar-nav">
          <li>
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Inicio
            </Link>
          </li>
          
          {isAuthenticated ? (
            <>
              <li>
                <Link 
                  to="/dashboard" 
                  className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/productos" 
                  className={`nav-link ${location.pathname === '/productos' ? 'active' : ''}`}
                >
                  Productos
                </Link>
              </li>
              <li>
                <span className="nav-link">
                  👤 {user?.nombre || 'Usuario'}
                </span>
              </li>
              <li>
                <button 
                  onClick={onLogout} 
                  className="nav-link"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  🚪 Cerrar Sesión
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link 
                to="/login" 
                className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
              >
                🔐 Iniciar Sesión
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 