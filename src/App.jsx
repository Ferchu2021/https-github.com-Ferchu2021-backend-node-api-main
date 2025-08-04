import { useState } from 'react';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    const mockUser = {
      _id: '1',
      nombre: 'Admin',
      email: 'admin@techstore.com',
      activo: true
    };
    setIsAuthenticated(true);
    setUser(mockUser);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            🖥️ TechStore - Equipos Informáticos
          </div>
          
          <ul className="navbar-nav">
            <li>
              <span className="nav-link">Inicio</span>
            </li>
            
            {isAuthenticated ? (
              <>
                <li>
                  <span className="nav-link">Dashboard</span>
                </li>
                <li>
                  <span className="nav-link">Productos</span>
                </li>
                <li>
                  <span className="nav-link">
                    👤 {user?.nombre || 'Usuario'}
                  </span>
                </li>
                <li>
                  <button 
                    onClick={handleLogout} 
                    className="nav-link"
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    🚪 Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button 
                  onClick={handleLogin}
                  className="nav-link"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  🔐 Iniciar Sesión
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {!isAuthenticated ? (
          // Página de Inicio
          <div className="fade-in">
            <div className="card" style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              textAlign: 'center',
              padding: '4rem 2rem'
            }}>
              <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                🖥️ TechStore
              </h1>
              <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
                Tu tienda de confianza para equipos de informática de alta calidad
              </p>
              <button onClick={handleLogin} className="btn btn-primary">
                🔐 Acceder al Sistema
              </button>
            </div>

            <div className="card">
              <h3 className="card-title">🏢 Sobre TechStore</h3>
              <p>
                Somos una empresa especializada en la venta de equipos de informática de alta calidad. 
                Ofrecemos laptops, desktops, monitores, periféricos y accesorios de las mejores marcas 
                del mercado.
              </p>
              <p>
                Nuestro compromiso es brindar productos de calidad con el mejor servicio al cliente 
                y soporte técnico especializado.
              </p>
            </div>
          </div>
        ) : (
          // Dashboard
          <div className="fade-in">
            <div className="card" style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            }}>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                🎯 Dashboard - TechStore
              </h1>
              <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
                Bienvenido, {user?.nombre || 'Usuario'}! Gestiona tu tienda de equipos informáticos
              </p>
            </div>

            <div className="grid grid-3" style={{ marginBottom: '2rem' }}>
              <div className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>👥</div>
                <h3 style={{ fontSize: '2rem', color: '#667eea', marginBottom: '0.5rem' }}>10</h3>
                <p>Clientes Registrados</p>
              </div>
              
              <div className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📦</div>
                <h3 style={{ fontSize: '2rem', color: '#667eea', marginBottom: '0.5rem' }}>500</h3>
                <p>Productos Disponibles</p>
              </div>
              
              <div className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>💰</div>
                <h3 style={{ fontSize: '2rem', color: '#667eea', marginBottom: '0.5rem' }}>$125,000</h3>
                <p>Ventas del Mes</p>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="card-title">👤 Información de la Cuenta</h2>
              </div>
              <div className="grid grid-2">
                <div>
                  <h3 style={{ marginBottom: '1rem' }}>Datos Personales</h3>
                  <p><strong>Nombre:</strong> {user?.nombre || 'No disponible'}</p>
                  <p><strong>Email:</strong> {user?.email || 'No disponible'}</p>
                  <p><strong>Estado:</strong> 
                    <span style={{ 
                      color: user?.activo ? '#28a745' : '#dc3545',
                      marginLeft: '0.5rem'
                    }}>
                      {user?.activo ? '✅ Activo' : '❌ Inactivo'}
                    </span>
                  </p>
                </div>
                
                <div>
                  <h3 style={{ marginBottom: '1rem' }}>Acciones de Cuenta</h3>
                  <button className="btn btn-secondary" style={{ marginBottom: '0.5rem', width: '100%' }}>
                    🔧 Editar Perfil
                  </button>
                  <button className="btn btn-secondary" style={{ width: '100%' }}>
                    🔒 Cambiar Contraseña
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App; 