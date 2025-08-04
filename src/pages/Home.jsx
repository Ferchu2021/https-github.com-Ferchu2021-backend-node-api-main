import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/usuarios');
        setUsuarios(response.data.usuarios || []);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los datos');
        setLoading(false);
      }
    };

    fetchUsuarios();
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
      {/* Hero Section */}
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
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/login" className="btn btn-primary">
            🔐 Acceder al Sistema
          </Link>
          <a href="#productos" className="btn btn-secondary">
            📦 Ver Productos
          </a>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-3" style={{ marginBottom: '3rem' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '2.5rem', color: '#667eea', marginBottom: '0.5rem' }}>
            {usuarios.length}
          </h3>
          <p>Clientes Registrados</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '2.5rem', color: '#667eea', marginBottom: '0.5rem' }}>
            500+
          </h3>
          <p>Productos Disponibles</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '2.5rem', color: '#667eea', marginBottom: '0.5rem' }}>
            5⭐
          </h3>
          <p>Calificación Promedio</p>
        </div>
      </div>

      {/* Productos Destacados */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">🛒 Productos Destacados</h2>
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
                Laptop de alto rendimiento para gaming y trabajo profesional
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
                Monitor de 27" con resolución 4K para una experiencia visual excepcional
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
                Teclado mecánico con switches Cherry MX y iluminación RGB personalizable
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
                Mouse inalámbrico de alta precisión con 25,600 DPI para gaming profesional
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Información de la Empresa */}
      <div className="grid grid-2">
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
        
        <div className="card">
          <h3 className="card-title">🎯 Nuestros Valores</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>✅ Calidad garantizada en todos nuestros productos</li>
            <li style={{ marginBottom: '0.5rem' }}>✅ Servicio al cliente excepcional</li>
            <li style={{ marginBottom: '0.5rem' }}>✅ Soporte técnico especializado</li>
            <li style={{ marginBottom: '0.5rem' }}>✅ Precios competitivos</li>
            <li style={{ marginBottom: '0.5rem' }}>✅ Entrega rápida y segura</li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="card" style={{ textAlign: 'center', background: '#f8f9fa' }}>
        <h2 style={{ marginBottom: '1rem' }}>¿Listo para encontrar tu equipo ideal?</h2>
        <p style={{ marginBottom: '2rem' }}>
          Accede a nuestro sistema para ver nuestro catálogo completo y gestionar tus pedidos
        </p>
        <Link to="/login" className="btn btn-primary">
          🔐 Iniciar Sesión
        </Link>
      </div>
    </div>
  );
};

export default Home; 