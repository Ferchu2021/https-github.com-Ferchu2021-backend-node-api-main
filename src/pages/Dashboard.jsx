import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalUsuarios: 0,
    totalProductos: 0,
    ventasMes: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/usuarios');
        setStats({
          totalUsuarios: response.data.usuarios?.length || 0,
          totalProductos: 500, // Simulado
          ventasMes: 125000 // Simulado
        });
        setLoading(false);
      } catch (err) {
        setError('Error al cargar estadísticas');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        {error}
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Header del Dashboard */}
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

      {/* Estadísticas */}
      <div className="grid grid-3" style={{ marginBottom: '2rem' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>👥</div>
          <h3 style={{ fontSize: '2rem', color: '#667eea', marginBottom: '0.5rem' }}>
            {stats.totalUsuarios}
          </h3>
          <p>Clientes Registrados</p>
        </div>
        
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📦</div>
          <h3 style={{ fontSize: '2rem', color: '#667eea', marginBottom: '0.5rem' }}>
            {stats.totalProductos}
          </h3>
          <p>Productos Disponibles</p>
        </div>
        
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>💰</div>
          <h3 style={{ fontSize: '2rem', color: '#667eea', marginBottom: '0.5rem' }}>
            ${stats.ventasMes.toLocaleString()}
          </h3>
          <p>Ventas del Mes</p>
        </div>
      </div>

      {/* Acciones Rápidas */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">⚡ Acciones Rápidas</h2>
        </div>
        <div className="grid grid-2">
          <Link to="/productos" className="card" style={{ 
            textDecoration: 'none', 
            color: 'inherit',
            transition: 'transform 0.3s',
            cursor: 'pointer'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
            <h3 style={{ marginBottom: '0.5rem' }}>Gestionar Productos</h3>
            <p style={{ color: '#666' }}>
              Agregar, editar o eliminar productos del catálogo
            </p>
          </Link>
          
          <div className="card" style={{ 
            textDecoration: 'none', 
            color: 'inherit',
            transition: 'transform 0.3s',
            cursor: 'pointer'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
            <h3 style={{ marginBottom: '0.5rem' }}>Ver Reportes</h3>
            <p style={{ color: '#666' }}>
              Análisis de ventas y estadísticas detalladas
            </p>
          </div>
        </div>
      </div>

      {/* Productos Recientes */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">🆕 Productos Recientes</h2>
        </div>
        <div className="grid grid-4">
          <div className="product-card">
            <img 
              src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400" 
              alt="Laptop Gaming" 
              className="product-image"
            />
            <div className="product-info">
              <h3 className="product-title">Laptop Gaming Pro</h3>
              <div className="product-price">$1,299.99</div>
              <p className="product-description">
                Laptop de alto rendimiento para gaming
              </p>
            </div>
          </div>
          
          <div className="product-card">
            <img 
              src="https://images.unsplash.com/photo-1544866092-1677b00f868b?w=400" 
              alt="Monitor 4K" 
              className="product-image"
            />
            <div className="product-info">
              <h3 className="product-title">Monitor 4K Ultra HD</h3>
              <div className="product-price">$599.99</div>
              <p className="product-description">
                Monitor de 27" con resolución 4K
              </p>
            </div>
          </div>
          
          <div className="product-card">
            <img 
              src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400" 
              alt="Teclado Mecánico" 
              className="product-image"
            />
            <div className="product-info">
              <h3 className="product-title">Teclado Mecánico RGB</h3>
              <div className="product-price">$149.99</div>
              <p className="product-description">
                Teclado mecánico con switches Cherry MX
              </p>
            </div>
          </div>
          
          <div className="product-card">
            <img 
              src="https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?w=400" 
              alt="Mouse Gaming" 
              className="product-image"
            />
            <div className="product-info">
              <h3 className="product-title">Mouse Gaming Wireless</h3>
              <div className="product-price">$89.99</div>
              <p className="product-description">
                Mouse inalámbrico de alta precisión
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Información del Usuario */}
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
  );
};

export default Dashboard; 