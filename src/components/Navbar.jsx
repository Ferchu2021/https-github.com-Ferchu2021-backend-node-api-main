import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, user, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          🖥️ TechStore - Equipos Informáticos
        </Link>
        
        <ul className="navbar-nav">
          <li>
            <Link to="/" className="nav-link">
              Inicio
            </Link>
          </li>
          
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/productos" className="nav-link">
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
              <Link to="/login" className="nav-link">
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